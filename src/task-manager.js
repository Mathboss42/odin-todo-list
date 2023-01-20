import { Task } from "./task";
import { Project } from "./project";

let tasks = [];
let projects = [];

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