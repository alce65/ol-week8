export abstract class Component {
    protected template!: string;
    protected element!: Element;

    render(selector: string) {
        const e = document.querySelector(selector);
        if (e === null) return;
        this.element = e;
        this.element.innerHTML = this.template;
    }

    addRender(selector: string) {
        const e = document.querySelector(selector);
        if (e === null) return;
        this.element = e;
        this.element.innerHTML += this.template;
    }
    outRender(selector: string) {
        const e = document.querySelector(selector);
        if (e === null) return;
        this.element = e;
        this.element.outerHTML = this.template;
    }
}
