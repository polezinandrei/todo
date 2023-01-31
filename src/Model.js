export class Model {
    static insertTestDataToStorage() {
        if (localStorage.getItem('tasks') == null) {
            const json = [
                {id: 1, completed: true, text: `Task 1`},
                {id: 2, completed: false, text: `Task 2`},
                {id: 3, completed: false, text: `Task 3`},
            ];
            localStorage.setItem('tasks', JSON.stringify(json));
        }
    }

    static getTaskListFromStorage() {
        return JSON.parse(localStorage.getItem('tasks'));
    }

    insertTaskToList(text) {
        const taskArray = JSON.parse(localStorage.getItem('tasks'));
        let lastID = taskArray[taskArray.length - 1] == null ? 0 : taskArray[taskArray.length - 1].id;
        taskArray.push(
            {id: ++lastID, completed: false, text: text}
        );
        this.updateStorage(taskArray);
    }

    updateTaskByID(id, completed, text) {
        const json = JSON.parse(localStorage.getItem('tasks')).map(item => {
            if (item.id == id) {
                item.completed = completed;
                item.text = text;
            }

            return item;
        });
        this.updateStorage(json);
    }

    deleteTaskByID(id) {
        const json = JSON.parse(localStorage.getItem('tasks')).filter(item => {
            if (item.id != id)
                return item;
        });
        this.updateStorage(json);
    }

    updateStorage(json) {
        localStorage.removeItem('tasks');
        localStorage.setItem('tasks', JSON.stringify(json));
    }

    getTaskFromList(id) {
        return JSON.parse(localStorage.getItem('tasks')).find(value => value.id == id);
    }
}