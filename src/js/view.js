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
            div ({className:'flex'},[img({src: 'icons/checklist.svg', className:' bg-white center br-100 pa1 ba b--black-10 h3 w3'})]),
            h3({className: 'f3 tc'}, ([
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
        div ({className: 'pa1 ma1 w-100'},[
            input({
                type: 'text',
                className: 'pa2 w-90 ba b b--white bg-white',
                value: model.task,
                size: 50,
                placeholder: 'Write your task here...',
                oninput: e => change(inputMsg(e.target.value))
              }),
            img({
                className: 'pointer dim pl2 pt2 dib w-5 grow',
                type: 'button',
                src: 'icons/plus.svg',
                onclick: () => change(addMsg())
            })
        ])
    ]);
}

function taskTable(change, model) {
    return div([
        model.tasks.map(taskRow(change))
    ])
}

function taskRow(change) {
    return function (task, index) {
        return div({className: 'shadow-4 pa2 ma2 pv1 flex dim ' + (task.done ? '' : 'bg-white') },[
            div({className: 'pa1 ma1 fl w-5'}, [
                img({className: 'br-pill pointer', onclick: () => change(markDoneMsg(index)), src: task.done ? 'icons/check.svg':'icons/plus.svg'} )
            ]),
            div({className: 'pa1 ma1 fl w-90 gray ' + (task.done ? 'strike':'')},task.name),
            div({className: 'pa1 ma1 fl w-5'}, [
                img({className: 'br-pill pointer', title: 'Delete!', onclick: () => change(deleteMsg(index)), src: 'icons/kebab-vertical.svg'})
            ])
        ]);
    }
}

export default view;
