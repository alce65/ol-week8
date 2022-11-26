import { Component } from '../component/component.js';

export class Header extends Component {
    constructor(private selector: string) {
        super();
        this.template = this.createTemplate();
        this.render();
    }

    render() {
        super.addRender(this.selector);
    }

    private createTemplate() {
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
