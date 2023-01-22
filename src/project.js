export class Project {
    constructor(title, description = '', notes) {
        this.title = title;
        this.description = description;
        this.notes = notes;
        this.projectID = title.toLowerCase();
    }
}