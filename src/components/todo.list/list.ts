import { initializeTasks } from '../../mocks/tasks.js';
import { Task } from '../../models/task.js';
import { Component } from '../component/component.js';
import { Add } from '../todo.add/add.js';

export class List extends Component {
    tasks: Array<Task>;
    constructor(private selector: string) {
        super();
        this.tasks = initializeTasks();
        this.manageComponent();
    }

    manageComponent() {
        console.log(this.tasks);
        this.template = this.createTemplate();
        this.outRender(this.selector);
        new Add('slot[name="add"]', this.addTask.bind(this));
    }

    addTask(task: Task) {
        // Mutando el array this.tasks.push(task)
        this.tasks = [...this.tasks, task];
        console.log(this.tasks);
        this.manageComponent();
    }
    updateTask(id: string, data: Partial<Task>) {
        this.tasks = this.tasks.map((item) =>
            item.id === id ? { ...item, ...data } : item
        );
        this.manageComponent();
    }
    deleteTask(id: string) {
        this.tasks = this.tasks.filter((item) => item.id !== id);
        this.manageComponent();
    }

    createTemplate() {
        return `
        <section>
            <slot name="add"></slot>
            <h3>Lita de tareas</h3>
            <ul>
                <slot name="items"></slot>
            </ul>
        </section>
        `;
    }
}
