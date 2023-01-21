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

export function addTask(values) {
    const newTask = new Task(values[0], values[1], values[2], values[3], values[4], values[5]);
    tasks.push(newTask);
};

export function addProject(values) {
    const newProject = new Project(values[0], values[1], values[2]);
    projects.push(newProject);
}

export function getProjects() {
    return projects;
}