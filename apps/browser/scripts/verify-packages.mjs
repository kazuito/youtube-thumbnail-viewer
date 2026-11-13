import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = fileURLToPath(new URL("../", import.meta.url));
const { version } = JSON.parse(
  await readFile(path.join(app, "package.json"), "utf8"),
);
const output = path.join(app, ".output");
for (const browser of ["chrome", "firefox"]) {
  const manifest = JSON.parse(
    await readFile(path.join(output, `${browser}-mv3/manifest.json`), "utf8"),
  );
  assert.equal(manifest.manifest_version, 3);
  assert.deepEqual(manifest.content_scripts[0].matches, [
    "https://www.youtube.com/*",
  ]);
  assert.deepEqual(manifest.host_permissions, ["https://www.youtube.com/*"]);
  if (browser === "firefox") {
    assert.equal(
      manifest.browser_specific_settings.gecko.id,
      "youtube-thumbnail-viewer@kazuito",
    );
    assert.equal(
      manifest.browser_specific_settings.gecko.strict_min_version,
      "140.0",
    );
    assert.deepEqual(
      manifest.browser_specific_settings.gecko.data_collection_permissions
        .required,
      ["browsingActivity"],
    );
  } else {
    assert.equal(manifest.browser_specific_settings, undefined);
  }
}
const archive = path.join(
  output,
  `youtube-thumbnail-viewer-${version}-sources.zip`,
);
const entries = execFileSync("unzip", ["-Z1", archive], { encoding: "utf8" })
  .trim()
  .split("\n");
for (const required of [
  "package.json",
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
  "apps/browser/wxt.config.ts",
  "apps/browser/SOURCE_CODE_REVIEW.md",
]) {
  assert(entries.includes(required), `Missing source: ${required}`);
}
for (const entry of entries) {
  assert(
    !/(^|\/)(\.git|\.env[^/]*|node_modules|\.wxt|\.output|FIREFOX_SUPPORT_PLAN\.md)(\/|$)/.test(
      entry,
    ),
    `Unexpected source: ${entry}`,
  );
  assert(!entry.startsWith("apps/website/"));
  assert.notEqual(entry, "apps/browser/pnpm-lock.yaml");
}
async function hashes(root, relative = "") {
  const result = {};
  for (const entry of await readdir(path.join(root, relative), {
    withFileTypes: true,
  })) {
    const file = path.join(relative, entry.name);
    if (entry.isDirectory()) Object.assign(result, await hashes(root, file));
    else
      result[file] = createHash("sha256")
        .update(await readFile(path.join(root, file)))
        .digest("hex");
  }
  return result;
}
const directory = await mkdtemp(path.join(tmpdir(), "ytv-review-"));
try {
  execFileSync("unzip", ["-q", archive, "-d", directory]);
  const run = (args) =>
    execFileSync("pnpm", args, { cwd: directory, stdio: "inherit" });
  run(["install", "--frozen-lockfile", "--ignore-scripts"]);
  run(["--filter", "browser", "exec", "wxt", "prepare"]);
  run(["--filter", "browser", "build:firefox"]);
  assert.deepEqual(
    await hashes(path.join(output, "firefox-mv3")),
    await hashes(path.join(directory, "apps/browser/.output/firefox-mv3")),
  );
  console.log("Chrome/Firefox manifests and Firefox source rebuild verified.");
} finally {
  await rm(directory, { recursive: true, force: true });
}
