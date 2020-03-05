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

            expect(title.nodeName).toBe("H3");
            expect(title.childNodes[0].data).toBe("✔️osu.io :: todo List");
        });

        it("has a form", () => {
            const form = html.childNodes[1];

            expect(form.nodeName).toBe("FORM");
        });
    });
});
