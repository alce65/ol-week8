import { Component } from '../../components/component/component.js';

export class AboutPage extends Component {
    constructor(selector: string) {
        super();
        this.template = this.createTemplate();
        this.addRender(selector);
    }

    createTemplate() {
        return `
        <main>
            <h2>About</h2>
            <slot name="about"></slot>
        </main>
        `;
    }
}
