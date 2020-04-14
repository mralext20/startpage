import { terser } from "rollup-plugin-terser";
export default {
  input: 'app/main.js',
  plugins: [terser()],
  output: {
    file: "bundle.js",
    format: 'iife'
  }
}