import fs from "fs/promises";

export const commonOptions = {
  entryPoints: ["src/background.ts"],
  bundle: true,
  outdir: "dist",
  target: ["es2020", "chrome58", "edge16", "firefox57", "node12", "safari11"],
};

export async function cleanDistDir() {
  await fs.rm("dist", {
    recursive: true,
    force: true,
  });
}

export async function copyPublicDir() {
  fs.cp("public", "dist", {
    recursive: true,
    force: true,
  });
}
