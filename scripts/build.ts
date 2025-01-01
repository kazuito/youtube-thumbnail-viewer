import esbuild from "esbuild";
import { cleanDistDir, commonOptions, copyPublicDir } from "./utils";

(async () => {
  await cleanDistDir();
  await copyPublicDir();
  await esbuild.build({
    ...commonOptions,
    minify: true,
    sourcemap: false,
  });
})();
