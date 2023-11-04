import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src-js/index.ts"],
	format: ["esm"],
	dts: true,
	platform: "neutral",
	loader: {
		".wasm": "binary",
	},
});
