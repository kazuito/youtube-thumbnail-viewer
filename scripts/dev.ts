import esbuild from "esbuild";
import fs from "fs";
import { cleanDistDir, commonOptions, copyPublicDir } from "./utils";

(async () => {
  await cleanDistDir();
  await copyPublicDir();

  let esb = await esbuild.context({
    ...commonOptions,
    minify: false,
    sourcemap: true,
  });
  esb.watch();

  fs.watch("public", { recursive: true }, async (_, filename) => {
    fs.cp(
      `public/${filename}`,
      `dist/${filename}`,
      {
        force: true,
      },
      () => {}
    );
  });
})();
