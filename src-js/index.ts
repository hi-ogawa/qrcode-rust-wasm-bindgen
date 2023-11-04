import { range, tinyassert } from "@hiogawa/utils";
import * as pkg from "../pkg/index";
import pkgWasm from "../pkg/index_bg.wasm"; // let tsup/esbuild bundle wasm binary ~ 50KB

export async function init() {
	const wasmModule = await WebAssembly.compile(pkgWasm as any as Uint8Array);
	await pkg.default(wasmModule);
}

// re-export everything from wasm-bindgen build
export { pkg };

// implement wrapper helper in javascript
export function qrcodeEncode(input: string) {
	const inputBin = new TextEncoder().encode(input);
	const rawData = pkg.qrcode_encode(inputBin);

	const width = Math.sqrt(rawData.length);
	tinyassert(Number.isInteger(width));

	const data = range(width).map((i) =>
		range(width).map((j) => rawData[i * width + j]),
	);
	return { width, rawData, data };
}
