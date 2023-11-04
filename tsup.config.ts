import { defineConfig } from "tsup";

export default [
	defineConfig({
		entry: ["src-js/index.ts"],
		format: ["esm"],
		dts: true,
		platform: "neutral",
		loader: {
			".wasm": "binary",
		},
	}),
	defineConfig({
		entry: ["src-js/cli.ts"],
		format: ["esm"],
		dts: true,
		platform: "node",
		loader: {
			".wasm": "binary",
		},
	}),
];
