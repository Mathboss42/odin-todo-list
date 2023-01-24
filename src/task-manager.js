import { Task } from "./task";
import { Project } from "./project";

let tasks = [];
let projects = [];

let currentProjectID = 'today';

export function getTasks(projectID = '') {
    if (!(projectID === '')) {
        return tasks.filter(task => task.projectID === projectID);
    } else {
        return tasks;
    }
};

export function addTask(values) {
    const newTask = new Task(values[0], values[1], values[2], values[3], values[4], values[5]);
    tasks.push(newTask);
};

export function addProject(values) {
    const newProject = new Project(values[0], values[1], values[2]);
    projects.push(newProject);
}

export function getProjects(projectID = '') {
    if (!(projectID === '')) {
        return projects.filter(project => project.projectID === projectID);
    } else {
        return projects;
    }
}

export function checkForProjectDuplicates(projectTitle) {    
    for (let i = 0; i < projects.length; i++) {
        if (projectTitle === projects[i].title) {
            return true;
        }
    }

    return false;
}

export function setCurrentProject(id) {
    currentProjectID = id;
}

export function getCurrentProject() {
    return currentProjectID;
}

export function setDone(task) {
    const newTask = getTask(task);
    newTask[0].isDone = true;
}

export function setUndone(task) {
    const newTask = getTask(task);
    newTask[0].isDone = false;
}

function getTask(title) {
    return tasks.filter(task => task.title === title);
}

export function setTasks(newTask) {
    tasks.push(newTask);
}

export function setProjects(newProject) {
    projects.push(newProject);
}

export function removeTask(title) {
    console.log(title);
    tasks.splice(tasks.findIndex(task => task.title === title), 1);
    console.log(tasks);
}

export function removeProject(projectID) {
    console.log(projectID);
    projects.splice(projects.findIndex(task => task.projectID === projectID), 1);
    console.log(projects);
}