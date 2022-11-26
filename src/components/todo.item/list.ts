import { Component } from '../component/component.js';

export class List extends Component {
    constructor(selector: string) {
        super();
        this.template = this.createTemplate();
        this.addRender(selector);
    }

    createTemplate() {
        return `
        <section>
            <address>
                ISDI Coders
            </address>
        </section>
        `;
    }
}
