import taskTemplate from './task-template.html';

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
    const newProjectButton = document.querySelector('.new-project-button');

    projectList.innerHTML = '';

    for (let i = 0; i < projects.length; i++) {
        const listItem = document.createElement('li');
        listItem.classList.add('project');
        listItem.setAttribute('data-id', projects[i].projectID);
        const icon = document.createElement('i');
        icon.classList.add('fa-solid');
        icon.classList.add('fa-file');
        listItem.appendChild(icon);
        listItem.innerHTML += projects[i].title;
        listItem.addEventListener('click', callback);

        projectList.appendChild(listItem);
    }
}

export function updateTaskList(taskList) {
    console.log('updateTaskList');

    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '';

    for (let i = 0; i < taskList.length; i++) {
        const currentTask = taskList[i];
        const newTaskItem = createTaskItem(currentTask);
        todoList.appendChild(newTaskItem);
    }
}

function createTaskItem(task) {
    const container = document.createElement('div');
    container.classList.add('task');
    container.setAttribute('data-priority', task.priority);
    container.innerHTML = taskTemplate;

    container.querySelector('h4').innerHTML = task.title;
    container.querySelector('.date').innerHTML = task.date;
    container.querySelector('.task-desc').innerHTML = task.description;
    container.querySelector('.notes').innerHTML = task.notes;
    
    container.querySelector('.priority').innerHTML += task.priority;

    return container;
}