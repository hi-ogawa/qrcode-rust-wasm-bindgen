import pkgInit from "../pkg/index";
import pkgWasm from "../pkg/index_bg.wasm"; // let tsup/esbuild bundle wasm binary ~ 50KB

export async function init() {
	const wasmModule = await WebAssembly.compile(pkgWasm as any as Uint8Array);
	await pkgInit(wasmModule);
}

export { qrcode_encode } from "../pkg/index";
