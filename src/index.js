import { format, isBefore, parseISO, parse, isToday } from 'date-fns';
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

const historyHeading = document.querySelector('#history-heading');
historyHeading.addEventListener('click', displayTaskList);  

const projects = taskManager.getProjects();



function openTaskCreator() {
    console.log('open task creator')
    console.log(projects);
    domManager.displayTaskCreator(projects);
}

function openProjectCreator(){
    domManager.displayProjectCreator();
}

function newTask(e) {
    e.preventDefault();
    const data = new FormData(addTaskForm);
    let values = [];
    for (const [name, value] of data) {
        values.push(value);
    }
    taskManager.addTask(values);
    domManager.closeCreator();

    if (taskManager.getCurrentProject() === 'all') {
        domManager.updateTaskList(taskManager.getTasks().sort(comparePriority), checkTask);
    } else if (taskManager.getCurrentProject() === 'today') {
        domManager.updateTaskList(taskManager.getTasks().filter(el => isToday(parseISO(el.dueDate)) || (el.projectID === 'dailies')).sort(comparePriority), checkTask);
    } else {
        domManager.updateTaskList(taskManager.getTasks(taskManager.getCurrentProject()).sort(comparePriority), checkTask);
    }

    populateStorage();

    console.log(taskManager.getCurrentProject());
    console.log(taskManager.getTasks());
}


function newProject(e) {
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
    } else {
        alert('Project already exists, please choose a different title.');
    }

    populateStorage();
}

function displayTaskList(e) {
    if (e.target.id === 'today-heading') {
        let taskList = taskManager.getTasks().filter(el => isToday(parseISO(el.dueDate)) || (el.projectID === 'dailies')).sort(comparePriority);
        domManager.updateTaskList(taskList, checkTask);
        
        taskManager.setCurrentProject('today');
        domManager.updateProjectBoard('today');
        
    } else if (e.target.id === 'dailies-heading') {
        let taskList = taskManager.getTasks().filter(el => el.projectID === 'dailies').sort(comparePriority);
        domManager.updateTaskList(taskList, checkTask)
        
        taskManager.setCurrentProject('dailies');
        domManager.updateProjectBoard('dailies');
        
    } else if (e.target.id === 'all-heading') {
        const taskList = taskManager.getTasks().sort(comparePriority);
        domManager.updateTaskList(taskList, checkTask);
        
        taskManager.setCurrentProject('all');
        domManager.updateProjectBoard('all');
        
    } else if (e.target.id === 'history-heading') {
        let taskList = taskManager.getTasks().filter(el => isBeforeToday(el.dueDate) && (el.isDone === true)).sort(comparePriority);
        console.log(taskList);
        domManager.updateTaskList(taskList, checkTask);
        
        taskManager.setCurrentProject('history');
        domManager.updateProjectBoard('history');
 
    } else {
        console.log(e.target.parentNode.dataset.id)
        const taskList = taskManager.getTasks().filter(el => el.projectID === e.target.parentNode.dataset.id).sort(comparePriority);
        domManager.updateTaskList(taskList, checkTask);

        taskManager.setCurrentProject(e.target.parentNode.dataset.id);
        const currentProject = taskManager.getProjects(e.target.parentNode.dataset.id);
        domManager.updateProjectBoard(currentProject[0], deleteProject);
    }

    domManager.toggleSelected(e.target.parentNode);
}

function comparePriority(a, b) {
    return b.priority - a.priority;
}

function isBeforeToday(date) {
    const today = new Date();
    const dateToCompare = parseISO(date);
    return isBefore(dateToCompare, today);
}

function deleteProject() {
    console.log('delete project please')
}

function checkTask(e) {
    if (e.target.checked) {
        taskManager.setDone(e.target.id);
    } else {
        taskManager.setUndone(e.target.id);
    }
}

function populateStorage() {
    const taskList = JSON.stringify(taskManager.getTasks());
    const newTaskList = taskList.substring(1, taskList.length-1);
    console.log(newTaskList);
    localStorage.setItem('tasks', newTaskList);
    
    const projectList = JSON.stringify(taskManager.getProjects());
    const newProjectList = projectList.substring(1, projectList.length-1);
    console.log(newProjectList);
    localStorage.setItem('projects', newProjectList);
}

function retrieveTasksFromStorage() {
    const taskList = localStorage.getItem('tasks');
    const newTaskList = taskList.match(/[^,]+,[^,]+,[^,]+,[^,]+,[^,]+,[^,]+,[^,]+/gm);
    for (let i = 0; i < newTaskList.length; i++) {
        const newTask = JSON.parse(newTaskList[i]);
        taskManager.setTasks(newTask);
    }
}

function retrieveProjectsFromStorage() {
    const projectList = localStorage.getItem('projects');
    const newProjectList = projectList.match(/[^,]+,[^,]+,[^,]+,[^,]+/gm);
    for (let i = 0; i < newProjectList.length; i++) {
        const newProject = JSON.parse(newProjectList[i]);
        taskManager.setProjects(newProject);
    }
}

if (!localStorage.getItem('tasks')) {
    populateStorage();
} else {
    retrieveTasksFromStorage();
}

if (!localStorage.getItem('projects')) {
    populateStorage();
} else {
    retrieveProjectsFromStorage();
}

domManager.updateProjectList(projects, displayTaskList);
domManager.updateTaskList(taskManager.getTasks().filter(el => isToday(parseISO(el.dueDate)) || (el.projectID === 'dailies')).sort(comparePriority), checkTask);