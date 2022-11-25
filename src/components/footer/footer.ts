import { Component } from '../component/component.js';

export class Footer extends Component {
    constructor(selector: string) {
        super();
        this.template = this.createTemplate();
        this.addRender(selector);
    }

    createTemplate() {
        return `
        <footer>
            <address>
                ISDI Coders
            </address>
        </footer>
        `;
    }
}
