import { Task } from '../../models/task.js';
import { consoleDebug } from '../../tools/debug.js';
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
        const element = super.innRender(this.selector);
        element
            .querySelector('[type="checkbox"]')
            ?.addEventListener('change', this.handleCheck.bind(this));
        element
            .querySelector('[role="button"]')
            ?.addEventListener('click', this.handleButton.bind(this));
        return element;
    }

    handleCheck() {
        const result: Partial<Task> = {
            id: this.item.id,
            isCompleted: !this.item.isCompleted,
        };
        consoleDebug('checked: ' + result);
        this.updateTask(this.item.id, result);
    }

    handleButton() {
        consoleDebug('deleted');
        this.deleteTask(this.item.id);
    }

    private createTemplate() {
        return `
        <li class="item-task" id="item_${this.item.id}">
            <span class="item-task__start">
                <input type="checkbox" ${this.item.isCompleted && 'checked'}>
                <span>${this.item.id}</span>
            </span>
            <span class="item-task__middle">
                <output>${this.item.title}</output>
                <output>${this.item.responsible}</output>
            </span>
            <span role="button" class="item-task__end button">
                🗑️
            </span>
        </li>
        `;
    }
}
