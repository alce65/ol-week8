export abstract class Component {
    protected template!: string;
    private element!: Element;

    render() {
        return;
    }
    protected innRender(selector: string) {
        const e = document.querySelector(selector);
        if (e === null) {
            return;
        }
        this.element = e;
        this.element.innerHTML = this.template;
    }

    protected addRender(selector: string) {
        const e = document.querySelector(selector);
        if (e === null) {
            return;
        }
        this.element = e;
        this.element.innerHTML += this.template;
    }
    protected outRender(selector: string) {
        const e = document.querySelector(selector);
        if (e === null) {
            return;
        }
        this.element = e;
        this.element.outerHTML = this.template;
    }
}
