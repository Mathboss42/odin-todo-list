import { Task } from "./task";
import { Project } from "./project";

let tasks = [
    {
        title: 'asdd',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi, deleniti.',
        dueDate: '2024-12-44',
        priority: 1,
        notes: 'a bit of notes',
        projectID: 'dailies'
    },
    {
        title: 'qw',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi, deleniti.',
        dueDate: undefined,
        priority: 3,
        notes: 'a bit of notes',
        projectID: 'dailies'
    },
    {
        title: 'qweqweqweqweqweqweqwe',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi, deleniti.',
        dueDate: undefined,
        priority: 2,
        notes: 'a bit of notes for fun',
        projectID: 'dailies'
    },
    {
        title: 'AGAEG',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi, deleniti.',
        dueDate: undefined,
        priority: 2,
        notes: '',
        projectID: 'asdaweawd'
    },
    {
        title: 'AEHERHERHH',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi, deleniti.',
        dueDate: undefined,
        priority: 1,
        notes: 'a bit of notes because why not',
        projectID: 'asdaweawd'
    },
];
let projects = [
    {
        title: 'asdaweawd',
        description: '',
        notes: '',
        projectID: 'asdaweawd'
    },
];

let currentProject = {};

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
    console.log(getProjects);
}

export function getProjects() {
    return projects;
}

export function checkForProjectDuplicates(projectTitle) {    
    for (let i = 0; i < projects.length; i++) {
        if (projectTitle === projects[i].title) {
            return true;
        }
    }

    return false;
}

export function setCurrentProject(newProject) {
    currentProject = newProject;
}

export function getCurrentProject() {
    return currentProject;
}


// {
//     title: 'Dailies',
//     desc: 'Tasks that should be done everyday.',
//     notes: '',
//     projectID: 'dailies',
// }