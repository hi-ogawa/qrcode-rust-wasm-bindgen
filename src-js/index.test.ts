import { range } from "@hiogawa/utils";
import { beforeAll, describe, expect, it } from "vitest";
import { init, qrcode_encode } from "../dist";

beforeAll(async () => {
	await init();
});

describe(qrcode_encode, () => {
	it("basic", () => {
		const data = new TextEncoder().encode("Hello");
		const result = qrcode_encode(data);

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
});
