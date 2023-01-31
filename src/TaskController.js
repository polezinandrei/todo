import {Model} from "./Model"; Model

export class TaskController {
    constructor(id = null) {
        this.id = id;
        this.completed = id == null ? false : this.getTaskByID(id).completed;
        this.text = id == null ? 'New Task' : this.getTaskByID(id).text;
    }

    static loadTestData() {
        Model.insertTestDataToStorage();
    }

    getTaskByID(id) {
        const model = new Model();
        return model.getTaskFromList(id);
    }

    save() {
        const model = new Model();
        model.updateTaskByID(this.id, this.completed, this.text);
    }

    delete() {
        const model = new Model();
        model.deleteTaskByID(this.id);
    }

    getTasks() {
        return Model.getTaskListFromStorage();
    }

    addToList(text = 'New Task') {
        const model = new Model();
        model.insertTaskToList(text);
    }
}