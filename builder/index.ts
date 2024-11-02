import esBuild from "esbuild";
import * as path from "path";
import {nodeExternalsPlugin} from "esbuild-node-externals";

const shared = {
  bundle: true,
  entryPoints: [path.resolve("./src/index.ts")],
  minify: true,
  plugins: [nodeExternalsPlugin()]
}
esBuild.build({
  ...shared,
  format: "esm",
  outfile: path.resolve("./dist/index.mjs"),
}).then(() => {
  console.log("Build ESM Finish");
})

esBuild.build({
  ...shared,
  format: "cjs",
  outfile: path.resolve("./dist/index.cjs"),
}).then(() => {
  console.log("Build CJS Finish");
})