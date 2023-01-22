import projectCreatorTemplate from './task-creator-template.html';

// const projectTemplate = `<li class="project"><i class="fa-solid fa-file"></i>${text}</li>`

export function displayTaskCreator(projects) {
    const select = document.querySelector('.project-selection select');
    const container = document.querySelector('.task-creator-container');
    const closeButton = document.querySelector('.new-task-close-button');
    container.classList.remove('hidden');
    closeButton.addEventListener('click', closeCreator);
    
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