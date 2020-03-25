import expect from "expect";
import defaultModel from "../../src/js/model";

describe("Josu.io initial model", () => {
    it("has 0 tasks", () => {
        expect(defaultModel.tasks.length).toBe(0);
    });

    it("has empty name", () => {
        expect(defaultModel.name).toBe("");
    });

    it("has done to false", () => {
        expect(defaultModel.done).toBe(false);
    });
});
