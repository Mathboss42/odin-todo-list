import './styles.css';
import * as taskManager from './task-manager';
import * as domManager from './dom-manager';

const newTaskButton = document.querySelector('.new-task-button');
const newProjectButton = document.querySelector('.new-project-button');
newTaskButton.addEventListener('click', openTaskCreator);
newProjectButton.addEventListener('click', openProjectCreator);

function openTaskCreator() {
    console.log('open task creator')
    const projects = taskManager.getProjects();
    domManager.displayTaskCreator(projects);
}

function openProjectCreator(){
    domManager.displayProjectCreator();
}

export function newTask() {
    taskManager.addTask();
}


export function newProject() {
    taskManager.addProject();
}

