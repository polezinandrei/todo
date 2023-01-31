import {TaskController} from "./TaskController"; TaskController

export class View {
    getHTML() {
        const taskList = new TaskController();
        const tasks = taskList.getTasks();
        let html = '';

        tasks.forEach(item => {
            html += `<label data-id="${item.id}">
                            <p>
                                <input data-id="${item.id}" type="checkbox" class="checkbox filled-in" ${item.completed ? "checked" : ""} />
                                <span>${item.text}</span>
                            </p>
                            <p class="manage">
                                <a href="#"><i data-id="${item.id}" class="material-icons dp48 btn-edit">create</i></a>
                                <a href="#"><i data-id="${item.id}" class="material-icons dp48 btn-delete">delete</i></a>
                            </p>                        
                        </label>`;
        });

        return html;
    }
}