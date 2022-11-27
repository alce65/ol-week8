import { Component } from '../../components/component/component.js';

export class AboutPage extends Component {
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
        <main>
            <h2>About</h2>
            <slot name="about"></slot>
        </main>
        `;
    }
}
