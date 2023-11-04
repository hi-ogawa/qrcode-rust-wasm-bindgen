import process from "node:process";
import { colors } from "@hiogawa/utils";
import { init, qrcodeEncode } from "./index";

async function main() {
	const [input] = process.argv.slice(2);
	if (!input) {
		console.log("Usage: qrcode-rust-wasm-bindgen <input>");
		return;
	}

	await init();
	const result = qrcodeEncode(input);

	const colorMap = [colors.inverse("  "), "  "];
	const padWidth = 1;
	const fullWidth = result.width + 2 * padWidth;

	let output = "";
	output += colorMap[0].repeat(fullWidth) + "\n";
	for (const row of result.data) {
		output += colorMap[0].repeat(padWidth);
		output += row.map((c) => colorMap[c]).join("");
		output += colorMap[0].repeat(padWidth) + "\n";
	}
	output += colorMap[0].repeat(fullWidth);
	console.log(output);
}

main();
