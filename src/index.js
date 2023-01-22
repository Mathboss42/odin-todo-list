import './styles.css';
import * as taskManager from './task-manager';
import * as domManager from './dom-manager';

const newTaskButton = document.querySelector('.new-task-button');
const newProjectButton = document.querySelector('.new-project-button');
const addTaskForm = document.querySelector('.new-task-form');
const addProjectForm = document.querySelector('.new-project-form');
newTaskButton.addEventListener('click', openTaskCreator);
newProjectButton.addEventListener('click', openProjectCreator);
addTaskForm.addEventListener('submit', newTask);
addProjectForm.addEventListener('submit', newProject);

function openTaskCreator() {
    console.log('open task creator')
    const projects = taskManager.getProjects();
    console.log(projects);
    domManager.displayTaskCreator(projects);
}

function openProjectCreator(){
    domManager.displayProjectCreator();
}

export function newTask(e) {
    e.preventDefault();
    const data = new FormData(addTaskForm);
    let values = [];
    for (const [name, value] of data) {
        values.push(value);
    }
    taskManager.addTask(values);
    domManager.closeCreator();
    console.log(taskManager.getTasks());
}


export function newProject(e) {
    e.preventDefault();
    const data = new FormData(addProjectForm);
    let values = [];
    for (const [name, value] of data) {
        values.push(value);
    }
    taskManager.addProject(values);
    domManager.closeCreator();
    console.log(taskManager.getProjects());
}

