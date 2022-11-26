import { Component } from '../../components/component/component.js';
import { List } from '../../components/todo.list/list.js';

export class TodoPage extends Component {
    constructor(selector: string) {
        super();
        this.template = this.createTemplate();
        this.addRender(selector);
        new List('slot');
    }

    createTemplate() {
        return `
        <main>
            <h2>Tareas</h2>
            <slot name="todo"></slot>
        </main>
        `;
    }
}
