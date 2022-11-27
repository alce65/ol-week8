import { Component } from '../../components/component/component.js';
import { List } from '../../components/todo.list/list.js';

export class TodoPage extends Component {
    constructor(private selector: string) {
        super();
        this.template = this.createTemplate();
        this.render();
        new List('.todo-wrapper');
    }

    render() {
        return super.innRender(this.selector);
    }

    private createTemplate() {
        return `
        <main>
            <h2>Tareas</h2>
            <div class="todo-wrapper"></div>
        </main>
        `;
    }
}
