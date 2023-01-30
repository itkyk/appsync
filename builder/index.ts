import esBuild from "esbuild";
import * as path from "path";

const shared = {
  bundle: true,
  entryPoints: [path.resolve("./src/index.ts")],
  sourcemap: true,
  minify: true,
  target: "es6",
}
esBuild.build({
  ...shared,
  format: "esm",
  outfile: path.resolve("./dist/index.esm.js"),
}).then(() => {
  console.log("Build ESM Finish");
})

esBuild.build({
  ...shared,
  format: "cjs",
  outfile: path.resolve("./dist/index.cjs.js"),
}).then(() => {
  console.log("Build CJS Finish");
})