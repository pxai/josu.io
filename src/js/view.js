import hh from "hyperscript-helpers";
import { h }from "virtual-dom";
import { deleteMsg, inputMsg, addMsg, markDoneMsg } from "./update";

const {
    section, div, h3, button, pre,
    form, label, input,
    span, a
 } = hh(h);

function view (change, model) {
    return section({ className: 'center sans-serif pa3 ph5-ns' }, [
            h3({className: 'f3'}, String.fromCodePoint(0x2714) + "osu.io todo list"),
            taskForm(change, model),
            div([
                taskTable(change, model)
            ]),
            div({style: 'display: none'},[pre(JSON.stringify(model, false, 2))])
        ]
    );
}

function taskForm(change, model) {
    return form({className: 'flex'},[
        input({
            type: 'text',
            className: 'pa1 ma1',
            value: model.task,
            placeholder: 'Write your task here...',
            oninput: e => change(inputMsg(e.target.value))
          }),
        button({
            className: 'br-pill',
            type: 'button',
            onclick: () => change(addMsg())
        }, String.fromCodePoint(0x2795))
    ]);
}

function taskTable(change, model) {
    return div([
        model.tasks.map(taskRow(change))
    ])
}

function taskRow(change) {
    return function (task, index) {
        return div({className: 'shadow-4 pa2 ma1 flex dim ' + (task.done ? 'bg-washed-green' : 'bg-washed-red') },[
            div({className: 'pa1 ma1 fl w-5'}, [
                a({className: 'br-pill pointer', onclick: () => change(markDoneMsg(index))} , task.done ? String.fromCodePoint(0x2705):String.fromCodePoint(0x1F532))
            ]),
            div({className: 'pa1 ma1 fl w-90 gray'},task.name),
            div({className: 'pa1 ma1 fl w-5'}, [
                a({className: 'br-pill pointer', onclick: () => change(deleteMsg(index))} , "x")
            ])
        ]);
    }
}

export default view;
