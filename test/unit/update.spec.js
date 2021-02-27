import expect from "expect";
import sinon from "sinon";
import update, { deleteMsg, addMsg, addMultipleMsg, inputMsg, markDoneMsg, markEditMsg, markDeleteMsg, dropOverMsg, MSG } from "../../src/js/update";
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
                expect(addMsg(text)).toStrictEqual({
                    type: ""
                });
            });

            it("addMsg empty string", () => {
                const text = "  ";
                expect(addMsg(text)).toStrictEqual({
                    type: ""
                });
            });
        });

        describe("addMultipleMsg function", () => {
            it("addMsg", () => {
                const text = "new";
                const splitBy = ",";
                expect(addMultipleMsg(text, splitBy)).toStrictEqual({
                    type: MSG.ADDMULTIPLE,
                    splitBy
                });
            });

            it("addMsg empty string", () => {
                const text = "  ";
                const splitBy = ",";
                expect(addMultipleMsg(text, splitBy)).toStrictEqual({
                    type: ""
                });
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

        it("markEditMsg", () => {
            const index = 2;
            expect(markEditMsg(index)).toStrictEqual({
                type: MSG.EDIT,
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

        describe("dropOverMsg function", () => {
            it("dropOverMsg", () => {
                const event = { preventDefault: sinon.spy(), dataTransfer: { getData:  sinon.stub().returns(5) } };
                expect(dropOverMsg(event, 4)).toStrictEqual({
                    type: MSG.DROP,
                    x: 5,
                    y: 4
                });
            });

            it("dropOverMsg without origin", () => {
                const event = { preventDefault: sinon.spy(), dataTransfer: { getData:  sinon.stub().returns("") } };
                expect(dropOverMsg(event, 4)).toStrictEqual({
                    type: ""
                });
            });
        });
    });

    describe("Update function", () => {
        it("delete", () => {
            const index = 1;
            const msg = deleteMsg(index);

            const result = update(msg, defaultModel);
            const expected = {
                tasks: [],
                name: '',
                done: false
            };

            expect(result).toStrictEqual(expected);
        });

        it("add", () => {
            const text = "New task";
            const msg = addMsg(text);
            const newTask = { name: text, done: false, preDelete: false, edit: false };
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
            const index = 0;
            const text = "New task";
            defaultModel.name = text;
            let msg = addMsg(text);
            let result = update(msg, defaultModel);

            msg = markDoneMsg(index);
            result = update(msg, result);
            const expected = {
                tasks: [
                    { name: text, done: true, preDelete: false, edit: false },
                ],
                name: '',
                done: false
            };

            expect(result).toStrictEqual(expected);
        });

        it("drag and drop", () => {
            const event = { preventDefault: sinon.spy(), dataTransfer: { getData:  sinon.stub().returns(2) } };
            const destiny = 0;
            const model = {
                tasks: [
                    { name: "Hello", done: false, preDelete: false, edit: false },
                    { name: "Bye", done: false, preDelete: false, edit: false },
                    { name: "See you", done: true, preDelete: false, edit: false }
                ],
                name: '',
                done: false
            }

            let msg = dropOverMsg(event, destiny);
            let result = update(msg, model);

            const expected = {
                tasks: [
                    { name: "See you", done: true, preDelete: false, edit: false },
                    { name: "Bye", done: false, preDelete: false, edit: false },
                    { name: "Hello", done: false, preDelete: false, edit: false }
                ],
                name: '',
                done: false
            };

            expect(result).toStrictEqual(expected);
        });

        it("marks as deleted", () => {
            const index = 1;
            const model = {
                tasks: [
                    { name: "Hello", done: false, preDelete: false, edit: false },
                    { name: "Bye", done: false, preDelete: false, edit: false },
                    { name: "See you", done: true, preDelete: false, edit: false }
                ],
                name: '',
                done: false
            }

            let msg = markDeleteMsg(index);
            let result = update(msg, model);

            const expected = {
                tasks: [
                    { name: "Hello", done: false, preDelete: false, edit: false },
                    { name: "Bye", done: false, preDelete: true, edit: false },
                    { name: "See you", done: true, preDelete: false, edit: false }
                ],
                name: '',
                done: false
            };

            expect(result).toStrictEqual(expected);
        });

        it("edits", () => {
            const index = 1;
            const model = {
                tasks: [
                    { name: "Hello", done: false, preDelete: false, edit: false },
                    { name: "Bye", done: false, preDelete: false, edit: false },
                    { name: "See you", done: true, preDelete: false, edit: false }
                ],
                name: '',
                done: false
            }

            let msg = markEditMsg(index);
            let result = update(msg, model);

            const expected = {
                tasks: [
                    { name: "Hello", done: false, preDelete: false, edit: false },
                    { name: "Bye", done: false, preDelete: false, edit: true },
                    { name: "See you", done: true, preDelete: false, edit: false }
                ],
                name: '',
                done: false
            };

            expect(result).toStrictEqual(expected);
        });
    });
});
