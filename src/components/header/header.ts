import { Component } from '../component/component.js';

export class Header extends Component {
    constructor(private selector: string) {
        super();
        this.template = this.createTemplate();
        this.render();
    }

    render() {
        return super.innRender(this.selector);
    }

    private createTemplate() {
        return `
        <header>
            <h1>
                Learning Components
            </h1>
        </header>
        `;
    }
}
