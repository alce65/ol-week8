import { initializeTasks } from '../../mocks/tasks.js';
import { Task } from '../../models/task.js';
import { consoleDebug } from '../../tools/debug.js';
import { Component } from '../component/component.js';
import { Add } from '../todo.add/add.js';
import { Item } from '../todo.item/item.js';

export class List extends Component {
    tasks: Array<Task>;
    constructor(private selector: string) {
        super();
        this.tasks = initializeTasks();
        this.manageComponent();
    }

    manageComponent() {
        consoleDebug(this.tasks);
        this.template = this.createTemplate();
        this.render();
        new Add('slot[name="add"]', this.addTask.bind(this));
        this.tasks.forEach(
            (item) =>
                new Item(
                    'ul.slot-items',
                    item,
                    this.updateTask.bind(this),
                    this.deleteTask.bind(this)
                )
        );
    }

    render() {
        super.render(this.selector);
    }

    addTask(task: Task) {
        // Mutando el array this.tasks.push(task)
        this.tasks = [...this.tasks, task];
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
            <ul class="slot-items"></ul>
        </section>
        `;
    }
}
