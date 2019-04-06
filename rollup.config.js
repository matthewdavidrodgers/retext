import pkg from "./package.json";

export default {
  input: "./build/index.js",
  context: "null",
  moduleContext: "null",
  output: [
    {
      file: pkg.main,
      format: "cjs"
    },
    {
      file: pkg.module,
      format: "es"
    }
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {})
  ]
};
