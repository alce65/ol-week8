import { Task } from '../../models/task.js';
import { Component } from '../component/component.js';

export class Item extends Component {
    constructor(
        private selector: string,
        private item: Task,
        private updateTask: (id: string, data: Partial<Task>) => void,
        private deleteTask: (id: string) => void
    ) {
        super();
        this.template = this.createTemplate();
        this.render();
    }

    render() {
        super.addRender(this.selector);
        setTimeout(() => {
            const component = <HTMLElement>(
                document.querySelector(`#item_${this.item.id}`)
            );
            component
                .querySelector('[type="checkbox"]')
                ?.addEventListener('change', this.handleCheck.bind(this));
            component
                .querySelector('[role="button"]')
                ?.addEventListener('click', this.handleButton.bind(this));
        }, 100);
    }

    handleCheck() {
        const result: Partial<Task> = {
            id: this.item.id,
            isCompleted: !this.item.isCompleted,
        };
        console.log('checked', result);
        this.updateTask(this.item.id, result);
    }

    handleButton() {
        console.log('deleted');
        this.deleteTask(this.item.id);
    }

    createTemplate() {
        return `
        <li class="item-task" id="item_${this.item.id}">
            <span class="item-task__start">
                <input type="checkbox" ${this.item.isCompleted && 'checked'}>
                <span>${this.item.id}</span>
            </span>
            <span class="item-task__middle">
                <span>${this.item.title}</span>
                <span>${this.item.responsible}</span>
            </span>
            <span role="button" class="item-task__end button">
                🗑️
            </span>
        </li>
        `;
    }
}
