export class Task {
    constructor(title, description = '', dueDate, priority = 1, notes = '', projectID) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        // this.checklist = checklist;
        this.projectID = projectID;
    }
}