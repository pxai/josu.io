const expect = require("expect");
import { getSplitChar } from "../../src/js/helpers";


describe("getSplitChar", () => {
    it("should return comma", () => {
        const text = "This is, a text";
        expect(getSplitChar(text)).toEqual(",");
    });

    it("should return newline", () => {
        const text = "This is\n a text";
        expect(getSplitChar(text)).toEqual("\n");
    });

    it("should return newline over comma", () => {
        const text = "This, is\n a text";
        expect(getSplitChar(text)).toEqual("\n");
    });

    it("should return empty string", () => {
        const text = "This is a text";
        expect(getSplitChar(text)).toEqual("");
    });
});
