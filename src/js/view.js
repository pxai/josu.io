import hh from "hyperscript-helpers";
import { h }from "virtual-dom";
import { deleteMsg, inputMsg, addMsg, markDoneMsg, markDeleteMsg, markEditMsg, saveEditMsg, dropOverMsg } from "./update";

const {
    section, div, h3, button, pre,
    form, img, input,
    span, a, p, audio, source
 } = hh(h);

function view (change, model) {
    return section({ className: 'center sans-serif pa3 ph5-ns' }, [
            div ({className:'flex'},[img({src: 'icons/checklist.svg', className:' bg-white center br-100 pa1 ba b--black-10 h3 w3'})]),
            h3({className: 'f3 tc'}, ([
                img({src: 'icons/check_w.svg'}),
                "osu.io todo list"
            ])),
            taskForm(change, model),
            div([
                taskTable(change, model)
            ]),
            p({className: 'tc'},[a({href:"https://github.com/pxai/josu.io", className: 'tc white'},"josu.io")]),
            div({style: 'display: none'},[pre(JSON.stringify(model, false, 2))])
        ]
    );
}

function taskForm(change, model) {
    return div({className: 'flex'},[
        div ({className: 'pa1 ma1 w-100'},[
            input({
                type: 'text',
                className: 'pa2 w-90 ba b b--white bg-white',
                value: model.name,
                size: 50,
                placeholder: 'Write your task',
                oninput: e => change(inputMsg(e.target.value)),
                onkeyup: e =>  e.keyCode === 13 ? change(addMsg(model.name)) : void(0)
              }),
            img({
                className: 'pointer fg-white dim pl2 pt2 dib w-5 grow',
                type: 'button',
                src: 'icons/plus_w.svg',
                onclick: () => change(addMsg(model.name))
            })
        ])
    ]);
}

function taskTable(change, model) {
    return div([
        model.tasks.length && model.tasks.every(task => task.done) ? div ({className:'flex'},[
            audio({autoplay: true},[source({src: 'img/nyan_cat.mp3', type: 'audio/mpeg'})]),
            img({src: 'img/nyan.gif', className:'center'})
        ]): "",
        model.tasks.map(taskRow(change))
    ])
}

function taskRow(change) {
    return function (task, index) {
        return div({draggable: true, id: index,  ondragstart: e => { e.dataTransfer.setData("text", e.target.id); }, ondragover: (e) => change(dropOverMsg(e, index)), ondrop: (e) => change(dropOverMsg(e, index)), className: 'shadow-4 pa2 ma2 pv1 br2 flex dim ' + (task.done ? '' : 'bg-white') },[
            div({className: 'pa1 ma1 fl w-5'}, [
                img({className: 'br-pill pointer', onclick: () => change(markDoneMsg(index)), src: task.done ? 'icons/check.svg':'icons/plus.svg'} )
            ]),
            div({className: 'pa1 ma1 fl w-90 gray ' + (task.done ? 'strike':''), ondblclick: () => change(markEditMsg(index))},
                task.edit
                ? input({
                      className: 'pa2 w-90 ba b b--gray bg-white',
                      value: task.name,
                      size: 40,
                      placeholder: 'Write your task',
                      onkeyup: e =>  e.keyCode === 13 ? change(saveEditMsg(index, e.target.value)) : void(0)
                  })
                : task.name
            ),
            div({className: 'pa1 ma1 fl w-5 grow'},
                task.preDelete
                ? [img({className: 'br-pill pa1 pointer ', title: 'Cancel!', onclick: () => change(markDeleteMsg(index)), src: 'icons/x.svg'}),
                    img({className: 'br-pill pa1 pointer', title: 'Delete?', onclick: () => change(deleteMsg(index)), src: 'icons/trashcan.svg'}) ]
                : [img({className: 'br-pill pa1 pointer', title: 'Delete?', onclick: () => change(markDeleteMsg(index)), src: 'icons/trashcan.svg'}) ]
            )
        ]);
    }
}

function taskEdit(task, change) {
    return div ({className: 'pa1 ma1 w-100'},[
        input({
            type: 'text',
            className: 'pa2 w-90 ba b b--white bg-white',
            value: task.name,
            size: 50,
            oninput: e => change(inputMsg(e.target.value)),
            onkeyup: e =>  e.keyCode === 13 ? change(addMsg(model.name)) : void(0)
          }),
        img({
            className: 'pointer fg-white dim pl2 pt2 dib w-5 grow',
            type: 'button',
            src: 'icons/plus_w.svg',
            onclick: () => change(addMsg(model.name))
        })
    ])
}

export default view;
