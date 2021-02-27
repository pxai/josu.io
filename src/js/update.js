export const MSG = {
  ADD: "add",
  ADDMULTIPLE: "addMultiple",
  DEL: "delete",
  INPUT: "input",
  DONE: "done",
  PREDELETE: "predelete",
  DROP: "drop",
  EDIT: "edit"
};

export function deleteMsg(index) {
    return {
        type: MSG.DEL,
        index
    }
}

export function inputMsg(text) {
    return {
        type: MSG.INPUT,
        text
    }
}

export function addMsg(text) {
    if (!text.trim()) { return { type: '' } }
    return {
        type: MSG.ADD
    }
}

export function addMultipleMsg(text, splitBy) {
    if (!text.trim()) { return { type: '' } }
    return {
        type: MSG.ADDMULTIPLE,
        splitBy
    }
}

export function markDoneMsg(index) {
    return {
        type: MSG.DONE,
        index
    }
}

export function markEditMsg(index) {
    return {
        type: MSG.EDIT,
        index
    }
}

export function markDeleteMsg(index) {
    return {
        type: MSG.PREDELETE,
        index
    }
}

export function dropOverMsg(e, destiny) {
    e.preventDefault();
    if (!e.dataTransfer.getData("text")) { return { type: '' } }

    return {
        type: MSG.DROP,
        x: +e.dataTransfer.getData("text"),
        y: destiny
    }
}

export function update(msg, model) {
    let tasks = [];
    switch (msg.type) {
        case MSG.DEL:
            return {
                ...model,
                tasks: model.tasks.filter((task, i) => i !== msg.index).sort((t1,t2) => t1.done-t2.done )
            };
        case MSG.INPUT:
            return { ...model, name: msg.text }
        case MSG.ADD:
            const task = { name: model.name, done: false, preDelete: false, edit: false };
            return {
                ...model,
                name: "",
                tasks: [...model.tasks, task].sort((t1,t2) => t1.done-t2.done )
            };
        case MSG.ADDMULTIPLE:
            tasks = model.name.split(msg.splitBy).map( task => ({ name: model.name, done: false, preDelete: false, edit: false }));

            return {
                ...model,
                name: "",
                tasks: [...model.tasks, ...tasks].sort((t1,t2) => t1.done-t2.done )
            };
        case MSG.DONE:
            tasks = model.tasks.map( (task,i) => i !== msg.index ? task : { ...task, done: !task.done}).sort((t1,t2) => t1.done-t2.done );
            return {...model, tasks };
        case MSG.PREDELETE:
            tasks = model.tasks.map( (task,i) => i !== msg.index ? task : { ...task, preDelete: !task.preDelete}).sort((t1,t2) => t1.done-t2.done );
            return {...model, tasks };
        case MSG.EDIT:
            tasks = model.tasks.map( (task,i) => i !== msg.index ? task : { ...task, edit: !task.edit}).sort((t1,t2) => t1.done-t2.done );
            return {...model, tasks };
        case MSG.DROP:
            tasks = [ ...model.tasks ];
            [tasks[msg.y], tasks[msg.x]] = [tasks[msg.x], tasks[msg.y]];
            return {...model, tasks };
        default:
            return model;
    }

}

export default update;
