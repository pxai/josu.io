export const MSG = {
  ADD: "add",
  DEL: "delete",
  INPUT: "input",
  DONE: "done",
  PREDELETE: "predelete"
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
    if (!text.trim()) { return; }
    return {
        type: MSG.ADD
    }
}

export function markDoneMsg(index) {
    return {
        type: MSG.DONE,
        index
    }
}

export function markDeleteMsg(index) {
    return {
        type: MSG.PREDELETE,
        index
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
            console.log("About to add!! ");
            const task = { name: model.name, done: false, preDelete: false };
            return {
                ...model,
                name: "",
                tasks: [...model.tasks, task].sort((t1,t2) => t1.done-t2.done )
            };
        case MSG.DONE:
            tasks = model.tasks.map( (task,i) => i !== msg.index ? task : { ...task, done: !task.done}).sort((t1,t2) => t1.done-t2.done );
            return {...model, tasks };
        case MSG.PREDELETE:
            tasks = model.tasks.map( (task,i) => i !== msg.index ? task : { ...task, preDelete: !task.preDelete}).sort((t1,t2) => t1.done-t2.done );
            return {...model, tasks };
        default:
            return model;
    }

}

export default update;
