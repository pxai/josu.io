import expect from "expect";
import update, { deleteMsg, addMsg, inputMsg, markDoneMsg, markDeleteMsg, MSG } from "../../src/js/update";
import defaultModel from "../../src/js/model";

describe("Josu.io update", () => {
    let change;
    let model;
    let html;

    describe("Msg functions", () => {
        it("deleteMsg", () => {
            const index = 1;
            expect(deleteMsg(index)).toStrictEqual({
                type: MSG.DEL,
                index
            });
        });

        describe("addMsg function", () => {
            it("addMsg", () => {
                const text = "new";
                expect(addMsg(text)).toStrictEqual({
                    type: MSG.ADD
                });
            });

            it("addMsg empty", () => {
                const text = "";
                expect(addMsg(text)).toStrictEqual(undefined);
            });

            it("addMsg empty string", () => {
                const text = "  ";
                expect(addMsg(text)).toStrictEqual(undefined);
            });
        });

        it("inputMsg", () => {
          const text = "LOL";
            expect(inputMsg(text)).toStrictEqual({
                type: MSG.INPUT,
                text
            });
        });

        it("markDoneMsg", () => {
            const index = 2;
            expect(markDoneMsg(index)).toStrictEqual({
                type: MSG.DONE,
                index
            });
        });

        it("markDeleteMsg", () => {
            const index = 2;
            expect(markDeleteMsg(index)).toStrictEqual({
                type: MSG.PREDELETE,
                index
            });
        });
    });

    describe("Update function", () => {
        it("delete", () => {
            const index = 1;
            const msg = deleteMsg(index);

            const result = update(msg, defaultModel);
            const expected = {
                tasks: [
                    { name: "Do something", done: false, preDelete: false }
                ],
                name: '',
                done: false
            };

            expect(result).toStrictEqual(expected);
        });

        it("add", () => {
            const text = "New task";
            const msg = addMsg(text);
            const newTask = { name: text, done: false, preDelete: false };
            const model = { ...defaultModel, ...newTask  };

            const result = update(msg, model);
            const expected = {
                ...model,
                name: "",
                tasks: [ ...defaultModel.tasks, newTask ]
            };

            expect(result).toStrictEqual(expected);
        });

        it("input", () => {
            const newInput = "LOL";
            const msg = inputMsg(newInput);

            const result = update(msg, defaultModel);
            const expected = {
                ...defaultModel,
                name: newInput
            };

            expect(result).toStrictEqual(expected);
        });

        it("mark as done", () => {
            const index = 1;
            const msg = markDoneMsg(index);

            const result = update(msg, defaultModel);
            const expected = {
                tasks: [
                    { name: "Do something", done: false, preDelete: false },
                    { name: "Take a rest", done: true, preDelete: false }
                ],
                name: '',
                done: false
            };

            expect(result).toStrictEqual(expected);
        });
    });
});
