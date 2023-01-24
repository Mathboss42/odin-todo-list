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
        domManager.updateTaskList(taskManager.getTasks().sort(comparePriority), checkTask, deleteTask);
    } else if (taskManager.getCurrentProject() === 'today') {
        domManager.updateTaskList(taskManager.getTasks().filter(el => isToday(parseISO(el.dueDate)) || (el.projectID === 'dailies')).sort(comparePriority), checkTask, deleteTask);
    } else {
        domManager.updateTaskList(taskManager.getTasks(taskManager.getCurrentProject()).sort(comparePriority), checkTask, deleteTask);
    }

    populateTaskStorage();
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

    populateProjectStorage();
}

function displayTaskList(e) {
    if (e.target.id === 'today-heading') {
        let taskList = taskManager.getTasks().filter(el => isToday(parseISO(el.dueDate)) || (el.projectID === 'dailies')).sort(comparePriority);
        domManager.updateTaskList(taskList, checkTask, deleteTask);
        
        taskManager.setCurrentProject('today');
        domManager.updateProjectBoard('today');
        
    } else if (e.target.id === 'dailies-heading') {
        let taskList = taskManager.getTasks().filter(el => el.projectID === 'dailies').sort(comparePriority);
        domManager.updateTaskList(taskList, checkTask, deleteTask)
        
        taskManager.setCurrentProject('dailies');
        domManager.updateProjectBoard('dailies');
        
    } else if (e.target.id === 'all-heading') {
        const taskList = taskManager.getTasks().sort(comparePriority);
        domManager.updateTaskList(taskList, checkTask, deleteTask);
        
        taskManager.setCurrentProject('all');
        domManager.updateProjectBoard('all');
        
    } else if (e.target.id === 'history-heading') {
        let taskList = taskManager.getTasks().filter(el => isBeforeToday(el.dueDate) && (el.isDone === true)).sort(comparePriority);
        domManager.updateTaskList(taskList, checkTask, deleteTask);
        
        taskManager.setCurrentProject('history');
        domManager.updateProjectBoard('history');
 
    } else {
        const taskList = taskManager.getTasks().filter(el => el.projectID === e.target.parentNode.dataset.id).sort(comparePriority);
        domManager.updateTaskList(taskList, checkTask, deleteTask);

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

function deleteProject(e) {
    console.log('delete project please');
    taskManager.removeProject(e.target.dataset.id);
    domManager.updateProjectBoard('today');
    domManager.updateProjectList(projects, displayTaskList);
    populateProjectStorage()
}

function deleteTask(e) {
    console.log('delete TASK please');
    console.log(e.target);
    console.log(e.target.id);
    taskManager.removeTask(e.target.id);

    if (taskManager.getCurrentProject() === 'all') {
        domManager.updateTaskList(taskManager.getTasks().sort(comparePriority), checkTask, deleteTask);
    } else if (taskManager.getCurrentProject() === 'today') {
        domManager.updateTaskList(taskManager.getTasks().filter(el => isToday(parseISO(el.dueDate)) || (el.projectID === 'dailies')).sort(comparePriority), checkTask, deleteTask);
    } else {
        domManager.updateTaskList(taskManager.getTasks(taskManager.getCurrentProject()).sort(comparePriority), checkTask, deleteTask);
    }

    populateTaskStorage();
}

function checkTask(e) {
    if (e.target.checked) {
        taskManager.setDone(e.target.id);
    } else {
        taskManager.setUndone(e.target.id);
    }
}

function populateTaskStorage() {
    let taskList = taskManager.getTasks();
    for (let i = 0; i < taskList.length; i++) {
        for (let property in taskList[i]) {
            console.log(taskList[i][property]);
            if(typeof taskList[i][property] === 'string') {
                taskList[i][property] = escapeComma(taskList[i][property]);
            }
            console.log(taskList[i][property]);
        }
    }
    console.log(taskList);
    taskList = JSON.stringify(taskList);
    const newTaskList = taskList.substring(1, taskList.length-1);
    localStorage.setItem('tasks', newTaskList);
}

function populateProjectStorage() {
    let projectList = taskManager.getProjects();
    for (let i = 0; i < projectList.length; i++) {
        for (let property in projectList[i]) {
            console.log(projectList[i][property]);
            if(typeof projectList[i][property] === 'string') {
                projectList[i][property] = escapeComma(projectList[i][property]);
            }
            console.log(projectList[i][property]);
        }
    }
    projectList = JSON.stringify(projectList);
    const newProjectList = projectList.substring(1, projectList.length-1);
    localStorage.setItem('projects', newProjectList);
}

function retrieveTasksFromStorage() {
    const taskList = localStorage.getItem('tasks');
    const newTaskList = taskList.match(/[^,]+,[^,]+,[^,]+,[^,]+,[^,]+,[^,]+,[^,]+/gm);
    for (let i = 0; i < newTaskList.length; i++) {
        const newTask = JSON.parse(newTaskList[i]);
        for (let property in newTask) {
            console.log(newTask[property]);
            if(typeof newTask[property] === 'string') {
                newTask[property] = unEscapeComma(newTask[property]);
            }
            console.log(newTask[property]);
        }
        console.log(newTask);
        taskManager.setTasks(newTask);
    }
}

function retrieveProjectsFromStorage() {
    const projectList = localStorage.getItem('projects');
    const newProjectList = projectList.match(/[^,]+,[^,]+,[^,]+,[^,]+/gm);
    for (let i = 0; i < newProjectList.length; i++) {
        const newProject = JSON.parse(newProjectList[i]);
        for (let property in newProject) {
            console.log(newProject[property]);
            if(typeof newProject[property] === 'string') {
                newProject[property] = unEscapeComma(newProject[property]);
            }
            console.log(newProject[property]);
        }
        taskManager.setProjects(newProject);
    }
}

function escapeComma(string) {
    return string.replaceAll(',', '164589as1w1a6A');
}

function unEscapeComma(string) {
    return string.replaceAll('164589as1w1a6A', ',');
}

if (!localStorage.getItem('tasks')) {
    populateTaskStorage();
} else {
    retrieveTasksFromStorage();
}

if (!localStorage.getItem('projects')) {
    populateProjectStorage();
} else {
    retrieveProjectsFromStorage();
}

escapeComma('this, is a string with, commas,');
domManager.updateProjectList(projects, displayTaskList);
domManager.updateTaskList(taskManager.getTasks().filter(el => isToday(parseISO(el.dueDate)) || (el.projectID === 'dailies')).sort(comparePriority), checkTask, deleteTask);