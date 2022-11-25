import { Component } from '../component/component.js';

export class Sample extends Component {
    constructor(selector: string) {
        super();
        this.template = `<h1>Titulo Sample</h1>`;
        this.render(selector);
    }
}
