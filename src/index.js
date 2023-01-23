import './styles.css';
import * as taskManager from './task-manager';
import * as domManager from './dom-manager';



const newTaskButton = document.querySelector('.new-task-button');
newTaskButton.addEventListener('click', openTaskCreator);

const newProjectButton = document.querySelector('.new-project-button');
newProjectButton.addEventListener('click', openProjectCreator);

const addTaskForm = document.querySelector('.new-task-form');
addTaskForm.addEventListener('submit', newTask);

const addProjectForm = document.querySelector('.new-project-form');
addProjectForm.addEventListener('submit', newProject);

const todayHeading = document.querySelector('#today-heading');
todayHeading.addEventListener('click', displayTaskList);  

const dailiesHeading = document.querySelector('#dailies-heading');
dailiesHeading.addEventListener('click', displayTaskList);  

const allHeading = document.querySelector('#all-heading');
allHeading.addEventListener('click', displayTaskList);  

const projects = taskManager.getProjects();



function openTaskCreator() {
    console.log('open task creator')
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

    if(!(taskManager.checkForProjectDuplicates(values[0]))) {
        taskManager.addProject(values);
        domManager.closeCreator();
        domManager.updateProjectList(projects, displayTaskList);
        console.log(taskManager.getProjects());
    } else {
        alert('Project already exists, please choose a different title.');
    }
}

function displayTaskList(e) {
    if (e.target.id === 'today-heading') {
        return;
    } else if (e.target.id === 'dailies-heading') {
        let taskList = taskManager.getTasks().filter(el => el.projectID === 'dailies').sort(comparePriority);
        domManager.updateTaskList(taskList)
    } else if (e.target.id === 'all-heading') {
        const taskList = taskManager.getTasks().sort(comparePriority);
        domManager.updateTaskList(taskList);
    } else {
        const taskList = taskManager.getTasks().filter(el => el.projectID === e.target.dataset.id).sort(comparePriority);
        domManager.updateTaskList(taskList);
    }
}

function comparePriority(a, b) {
    return b.priority - a.priority;
}


domManager.updateProjectList(projects, displayTaskList);