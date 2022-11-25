import { Component } from '../../components/component/component.js';

export class HomePage extends Component {
    constructor(selector: string) {
        super();
        this.template = this.createTemplate();
        this.addRender(selector);
    }

    createTemplate() {
        return `
        <main>
            <h2>Home</h2>
            <slot name="home"></slot>
        </main>
        `;
    }
}
