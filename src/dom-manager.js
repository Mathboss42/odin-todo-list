import { format } from 'date-fns';
import taskTemplate from './task-template.html';
import * as descriptions from './descriptions';

export function displayTaskCreator(projects) {
    const select = document.querySelector('.project-selection select');
    const container = document.querySelector('.task-creator-container');
    const closeButton = document.querySelector('.new-task-close-button');
    container.classList.remove('hidden');
    closeButton.addEventListener('click', closeCreator);

    const dailiesOption = document.createElement('option');
    dailiesOption.setAttribute('value', 'dailies');
    dailiesOption.innerHTML = 'Dailies';
    select.appendChild(dailiesOption);
    
    for (let i = 0; i < projects.length; i++) {
        const option = document.createElement('option');
        option.setAttribute('value', projects[i].projectID);
        option.innerHTML = projects[i].title;
        select.appendChild(option);
    }
}

export function displayProjectCreator() {
    const container = document.querySelector('.project-creator-container');
    const closeButton = document.querySelector('.new-project-close-button');
    container.classList.remove('hidden');
    closeButton.addEventListener('click', closeCreator);
}

export function closeCreator() {
    const creator = document.querySelectorAll('.creator');
    creator.forEach(el => el.classList.add('hidden'));
    
    const select = document.querySelector('.project-selection select');
    select.innerHTML = '';

    const addTaskForm = document.querySelector('.new-task-form');
    const addProjectForm = document.querySelector('.new-project-form');
    addTaskForm.reset();
    addProjectForm.reset();
}

export function updateProjectList(projects, callback) {
    const projectList = document.querySelector('.project-list')

    projectList.innerHTML = '';

    for (let i = 0; i < projects.length; i++) {
        const listItem = document.createElement('li');
        listItem.classList.add('project');
        listItem.setAttribute('data-id', projects[i].projectID);
        
        const icon = document.createElement('i');
        icon.classList.add('fa-solid');
        icon.classList.add('fa-file');
        listItem.appendChild(icon);
        
        const heading = document.createElement('h5');
        heading.innerHTML += projects[i].title;
        listItem.appendChild(heading);
        
        heading.addEventListener('click', callback);
        icon.addEventListener('click', callback);
        
        projectList.appendChild(listItem);
    }
}

export function updateTaskList(taskList, callback) {
    console.log('updateTaskList');

    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '';

    for (let i = 0; i < taskList.length; i++) {
        const currentTask = taskList[i];
        const newTaskItem = createTaskItem(currentTask, callback);
        todoList.appendChild(newTaskItem);
        if (taskList[i].isDone) {
            newTaskItem.querySelector('input').setAttribute('checked', '');
        }
    }
}

function createTaskItem(task, callback) {
    const container = document.createElement('div');
    container.classList.add('task');
    container.setAttribute('data-priority', task.priority);
    container.innerHTML = taskTemplate;

    if (task.dueDate !== null && task.dueDate !== '' && task.dueDate !== undefined) {
        console.log(task.dueDate);
        container.querySelector('.date').innerHTML = `Due Date: ${format(new Date(task.dueDate), 'MM/dd/yyyy')}`;
    }

    container.querySelector('h4').innerHTML = task.title;
    container.querySelector('.task-desc').innerHTML = task.description;
    container.querySelector('.notes').innerHTML = task.notes;
    
    container.querySelector('.project-ref').innerHTML += task.projectID;
    container.querySelector('.priority').innerHTML += task.priority;
    container.querySelector('input').id = task.title;
    
    container.querySelector('input').addEventListener('change', callback);

    return container;
}

export function toggleSelected(element) {
    const selected = document.querySelector('.selected');
    if (selected) {
        selected.classList.remove('selected');
    }

    element.classList.add('selected');
}

export function updateProjectBoard(currentProjectID, callback) {
    const projectBoard = document.querySelector('.project-board');
    
    if (projectBoard.querySelector('.delete-button')) {
        projectBoard.querySelector('.delete-button').remove();
    }

    if (currentProjectID === 'today' || currentProjectID === 'dailies' || currentProjectID === 'all' || currentProjectID === 'history') {
        projectBoard.querySelector('.project-board-heading').innerHTML = capitalizeFirstLetter(currentProjectID);
        projectBoard.querySelector('.project-description').innerHTML = descriptions[currentProjectID];
    } else {
        const deleteButton = document.createElement('button');
        const icon = document.createElement('i');

        deleteButton.classList.add('delete-button');
        icon.classList.add('fa-solid');
        icon.classList.add('fa-trash');
        projectBoard.appendChild(deleteButton);
        deleteButton.appendChild(icon);

        deleteButton.addEventListener('click', callback);

        projectBoard.querySelector('.project-board-heading').innerHTML = capitalizeFirstLetter(currentProjectID.title);
        projectBoard.querySelector('.project-description').innerHTML = currentProjectID.description;
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}