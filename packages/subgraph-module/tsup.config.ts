import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: [
      "libs/**/index.ts", "index.ts"
    ],
    format: ["cjs", "esm"],
    target: "node20",
    splitting: false,
    sourcemap: true,
    clean: true,
    dts: true,
    outDir: "./dist",
  }
]);