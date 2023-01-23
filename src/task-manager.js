import { Task } from "./task";
import { Project } from "./project";

let tasks = [
    {
        title: 'asdd',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi, deleniti.',
        dueDate: null,
        priority: 1,
        notes: 'a bit of notes',
        projectID: 'dailies',
        isDone: false,
    },
    {
        title: 'qw',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi, deleniti.',
        dueDate: null,
        priority: 3,
        notes: 'a bit of notes',
        projectID: 'dailies',
        isDone: false,
    },
    {
        title: 'qweqweqweqweqweqweqw qweqweqweqweqweqwee',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi, deleniti.',
        dueDate: '2023-01-23',
        priority: 2,
        notes: 'a bit of notes for fun',
        projectID: 'asd',
        isDone: false,
    },
    {
        title: 'AGAEG',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi, deleniti.',
        dueDate: null,
        priority: 2,
        notes: '',
        projectID: 'asdaweawd',
        isDone: false,
    },
    {
        title: 'AEHERHERHH',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi, deleniti.',
        dueDate: '2022-01-01',
        priority: 1,
        notes: 'a bit of notes because why not',
        projectID: 'asdaweawd',
        isDone: true,
    },
];
let projects = [
    {
        title: 'asdaweawd',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, voluptatem!',
        notes: '',
        projectID: 'asdaweawd'
    },
    {
        title: 'asd',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, voluptatem!',
        notes: '',
        projectID: 'asd'
    },
    {
        title: 'asdaweawdasdasd',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, voluptatem!',
        notes: '',
        projectID: 'asdaweawdasdasd'
    },
];

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
    console.log(`task date is ${newTask.dueDate}`)
};

export function addProject(values) {
    const newProject = new Project(values[0], values[1], values[2]);
    projects.push(newProject);
    console.log(getProjects);
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


// {
//     title: 'Dailies',
//     desc: 'Tasks that should be done everyday.',
//     notes: '',
//     projectID: 'dailies',
// }