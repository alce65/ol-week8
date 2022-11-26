import { Task } from '../../models/task.js';
import { Component } from '../component/component.js';

type DataFormType = {
    title: string;
    responsible: string;
};

export class Add extends Component {
    constructor(selector: string, public handleAdd: (task: Task) => void) {
        super();
        this.template = this.createTemplate();
        this.outRender(selector);
        setTimeout(() => {
            document
                .querySelector('form.add')
                ?.addEventListener('submit', this.handleForm.bind(this));
        }, 100);
    }

    handleForm(event: Event) {
        const dataForm: DataFormType = {
            title: '',
            responsible: '',
        };

        event.preventDefault();
        const formElement = event.target as HTMLFormElement;
        const inputs = [
            ...formElement.querySelectorAll('[type="text"]'),
            ...formElement.querySelectorAll('[type="number"]'),
            ...formElement.querySelectorAll('select'),
        ];
        const values = [...inputs].map(
            (item) => (item as HTMLFormElement).value
        );
        dataForm.title = values[0];
        dataForm.responsible = values[1];
        console.log(dataForm);
        this.handleAdd(new Task(dataForm.title, dataForm.responsible));
    }

    createTemplate() {
        return `
        <section>
            <h3>Añadir tarea</h3>
            <form class="add">
                <div>
                    <label for="title">Tarea</label>
                    <input type="text" name="title" id="title" placeholder="Describe la tarea" required>
                </div>
                <div>
                    <label for="responsible">Responsable</label>
                    <input type="text" name="responsible" id="responsible" placeholder="Responsable de la tarea">
                </div>
                <div>
                    <button type='submit'>Añadir</button>
                </div>
            </form>
        </section>
        `;
    }
}
