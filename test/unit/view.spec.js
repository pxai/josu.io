import expect from "expect";
import view from "../../src/js/view";
import defaultModel from "../../src/js/model";
import createElement from "virtual-dom/create-element";

describe("App2 views", () => {
    let change;
    let model;
    let html;

    describe("With default model", () => {
        beforeEach(() => {
            model = defaultModel;
            change = () => {};
            html = createElement(view(change, model));
        });

        it("has a section wrapper", () => {
            expect(html.nodeName).toBe("SECTION");
        });

        it("has a title", () => {
            const title = html.childNodes[0];

            expect(title.nodeName).toBe("DIV");
            expect(title.childNodes[0].nodeName).toBe("IMG");
            expect(html.childNodes[1].nodeName).toBe("H3");
            expect(html.childNodes[1].childNodes[1].data).toBe("osu.io todo list");
        });

        it("has a form", () => {
            const form = html.childNodes[2];

            expect(form.nodeName).toBe("FORM");
        });

        it("has an input type text", () => {
            const form = html.childNodes[2];

            expect(form.childNodes[0].nodeName).toBe("DIV");
            expect(form.childNodes[0].childNodes[0].nodeName).toBe("INPUT");
        });

        it("has a button", () => {
            const form = html.childNodes[2];

            expect(form.childNodes[0].childNodes[1].nodeName).toBe("IMG");
        });
    });
});
