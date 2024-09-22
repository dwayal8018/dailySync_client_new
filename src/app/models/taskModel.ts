export class TaskModel {
    public id: number;
    public title: string;
    public description: string;
    public dueDate: string;
    public status: string;
    public category: string;
    public priority: string;
    public completed:boolean;
    constructor() {
        this.id = 0
        this.title = "";
        this.description = "";
        this.dueDate = "";
        this.status = "";
        this.category = "";
        this.priority = "";
        this.completed=false;
    }
}