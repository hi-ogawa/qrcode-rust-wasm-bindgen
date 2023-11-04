import { range } from "@hiogawa/utils";
import { beforeAll, describe, expect, it } from "vitest";
import { init, pkg, qrcodeEncode } from "../dist/index";

beforeAll(async () => {
	await init();
});

describe(qrcodeEncode, () => {
	it("basic", () => {
		const data = new TextEncoder().encode("Hello");
		const result = pkg.qrcode_encode(data);

		const width = Math.sqrt(result.length);
		expect(width).toMatchInlineSnapshot("21");

		const resultPretty = range(width)
			.map((i) =>
				range(width)
					.map((j) => (result[i * width + j] ? "#" : " "))
					.join("")
					.trimEnd(),
			)
			.join("\n");
		expect("\n" + resultPretty).toMatchInlineSnapshot(`
			"
			#######  #### #######
			#     #     # #     #
			# ### # # # # # ### #
			# ### # # #   # ### #
			# ### # ##  # # ### #
			#     # ## #  #     #
			####### # # # #######
			        # #
			# #####  # #  #####
			   #    #  ####  ## #
			  #####  ## # ## ###
			  #  # ## #####  ##
			 ###  ##### #  #    #
			        #   #  # #
			#######  # # #  # ##
			#     # # #    #####
			# ### # #  # #  #  #
			# ### # ## ##### #
			# ### # ##  # ##  #
			#     #  # #### ###
			####### ##  #   #  #"
		`);
	});

	it("wrapper", () => {
		const { width, data } = qrcodeEncode("Hello");
		expect(width).toMatchInlineSnapshot("21");
		expect(
			"\n" +
				data
					.map((row) =>
						row
							.map((c) => (c ? "#" : " "))
							.join("")
							.trimEnd(),
					)
					.join("\n"),
		).toMatchInlineSnapshot(`
			"
			#######  #### #######
			#     #     # #     #
			# ### # # # # # ### #
			# ### # # #   # ### #
			# ### # ##  # # ### #
			#     # ## #  #     #
			####### # # # #######
			        # #
			# #####  # #  #####
			   #    #  ####  ## #
			  #####  ## # ## ###
			  #  # ## #####  ##
			 ###  ##### #  #    #
			        #   #  # #
			#######  # # #  # ##
			#     # # #    #####
			# ### # #  # #  #  #
			# ### # ## ##### #
			# ### # ##  # ##  #
			#     #  # #### ###
			####### ##  #   #  #"
		`);
	});
});
