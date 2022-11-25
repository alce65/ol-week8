import { Component } from '../component/component.js';

export class Header extends Component {
    constructor(selector: string) {
        super();
        this.template = this.createTemplate();
        this.addRender(selector);
    }

    createTemplate() {
        return `
        <header>
            <h1>
                Learning Components
            </h1>
            <slot name="menu"></slot>
        </header>
        `;
    }
}
