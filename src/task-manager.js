import { Task } from "./task";
import { Project } from "./project";

let tasks = [];
let projects = [
    {
        name: 'project 1',
        desc: 'cool project',
        projectID: 'project001'
    },
    {
        name: 'project 2',
        desc: 'uncool project',
        projectID: 'project002'
    },
];

export function getTasks(projectID = '') {
    if (!(projectID === '')) {
        return tasks.filter(task => task.projectID === projectID);
    } else {
        return tasks;
    }
};

export function addTask(title, description, dueDate, priority, notes, checklist, projectID) {
    const newTask = new Task(title, description, dueDate, priority, notes, checklist, projectID);
    tasks.push(newTask);
};

export function addProject(title, description, projectID) {
    const newProject = new Project(title, description, projectID);
    projects.push(newProject);
}

export function getProjects() {
    return projects;
}