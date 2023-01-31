import {TaskController} from "./TaskController"; TaskController
import {View} from "./View"; View

document.addEventListener("DOMContentLoaded", () => {
    TaskController.loadTestData();

    let toDoList = document.querySelector('.todo-list');
    const view = new View();

    if (toDoList == null) {
        toDoList = document.createElement('div');
        toDoList.className = 'todo-list';
        document.querySelector('.container')
            .append(toDoList);
    }

    toDoList.innerHTML += view.getHTML();

    const btnAdd = document.querySelector('.btn-add');
    const taskText = document.querySelector('#task_text');

    btnAdd.addEventListener('click', () => {
        if (taskText.value != '') {
            const newTask = new TaskController();
            newTask.addToList(taskText.value);
            taskText.value = '';
            toDoList.innerHTML = '';
            toDoList.innerHTML += view.getHTML();
        }
    });

    let globalTask = null;
    const textWrapper = document.querySelector('.edit-text-wrapper');

    toDoList.addEventListener('click', function(event) {
        const target = event.target;

        if (target.classList.contains('checkbox')) {
            let task = new TaskController(target.dataset.id);
            task.completed = target.checked;
            task.save();
        }

        if (target.classList.contains('btn-delete')) {
            event.preventDefault();

            let task = new TaskController(target.dataset.id);
            const label = document.querySelector(`label[data-id="${target.dataset.id}"]`);

            task.delete();
            label.remove();
        }

        if (target.classList.contains('btn-edit')) {
            event.preventDefault();

            let task = new TaskController(target.dataset.id);
            console.log(task);
            const text = document.querySelector('#edit_text');
            const editTextWrapper = document.querySelector('.edit-text-wrapper');

            editTextWrapper.style.display = 'flex';
            text.focus();
            text.value = task.text;
            text.dataset.id = task.id;
            globalTask = task;
        }
    });

    const btnTextEdit = document.querySelector('.btn-edit-text');

    btnTextEdit.addEventListener('click', () => {
        const text = document.querySelector('#edit_text');
        const labelText = document.querySelector(`label[data-id="${globalTask.id}"] span`);
        const editTextWrapper = document.querySelector('.edit-text-wrapper');

        globalTask.text = text.value;
        globalTask.save();
        editTextWrapper.style.display = 'none';
        labelText.innerHTML = text.value;
    });
});