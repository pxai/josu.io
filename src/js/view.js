import hh from "hyperscript-helpers";
import { h }from "virtual-dom";
import { deleteMsg, inputMsg, addMsg, markDoneMsg } from "./update";

const {
    section, div, h3, button, pre,
    form, img, input,
    span, a
 } = hh(h);

function view (change, model) {
    return section({ className: 'center sans-serif pa3 ph5-ns' }, [
            h3({className: 'f3'}, ([
                img({src: 'icons/check.svg'}),
                "osu.io todo list"
            ])),
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
            size: 50,
            placeholder: 'Write your task here...',
            oninput: e => change(inputMsg(e.target.value))
          }),
        img({
            className: 'br-pill pointer dim pa2 grow',
            type: 'button',
            src: 'icons/plus.svg',
            onclick: () => change(addMsg())
        })
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
                img({className: 'br-pill pointer', onclick: () => change(markDoneMsg(index)), src: task.done ? 'icons/check.svg':'icons/plus.svg'} )
            ]),
            div({className: 'pa1 ma1 fl w-90 gray ' + (task.done ? 'strike':'')},task.name),
            div({className: 'pa1 ma1 fl w-5'}, [
                img({className: 'br-pill pointer', onclick: () => change(deleteMsg(index)), src: 'icons/kebab-vertical.svg'})
            ])
        ]);
    }
}

export default view;
