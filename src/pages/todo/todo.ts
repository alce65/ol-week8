import { Component } from '../../components/component/component.js';
import { List } from '../../components/todo.list/list.js';
import { consoleDebug } from '../../tools/debug.js';

export class TodoPage extends Component {
    constructor(private selector: string) {
        super();
        this.template = this.createTemplate();
        this.render();
        try {
            new List('.todo-wrapper');
        } catch (error) {
            consoleDebug((error as Error).message);
        }
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
