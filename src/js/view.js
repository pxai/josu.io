import hh from "hyperscript-helpers";
import { h }from "virtual-dom";
import { deleteMsg, inputMsg, addMsg, markDoneMsg } from "./update";

const {
    section, div, h3, button, pre,
    form, label, input,
    table, th, tr, td, a
 } = hh(h);

function view (change, model) {
    return section({ className: 'w6 mw6 mw6-ns center sans-serif pa3 ph5-ns' }, [
            h3({className: 'f3'},"✔️osu.io :: todo List"),
            taskForm(change, model),
            div([
                taskTable(change, model)
            ]),
            div([pre(JSON.stringify(model, false, 2))])
        ]
    );
}

function taskForm(change, model) {
    return form([
        input({
            type: 'text',
            value: model.task,
            placeholder: 'Write your task here...',
            oninput: e => change(inputMsg(e.target.value))
          }),
        button({
            className: 'br-pill',
            type: 'button',
            onclick: () => change(addMsg())
        }, "Save")
    ]);
}

function taskTable(change, model) {
    return table([
        tr([
            th("Change"),th("Task"), th("Done"), th("Del"),
        ]),
        model.tasks.map(taskRow(change))
    ])
}

function taskRow(change) {
    return function (task, index) {
        return tr([
            td([
                button({className: 'br-pill', onclick: () => change(markDoneMsg(index))} , task.done ? "v":"x")
            ]),
            td(task.name),
            td(task.done ? "Done":""),
            td([
                button({className: 'br-pill', onclick: () => change(deleteMsg(index))} , "Delete")
            ])
        ]);
    }
}

export default view;
