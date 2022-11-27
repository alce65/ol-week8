export abstract class Component {
    protected template!: string;
    private element!: Element | null;

    render() {
        return this.element;
    }

    // Renders use
    // footer innRender
    // header innRender
    // todo.item innRender + setTimeout...
    // pages innRender
    // todo.list cleanHTML + innRender
    // sample cleanHTML + innRender

    // menu outRender
    // todo.add outRender + setTimeout...

    protected innRender(selector: string) {
        try {
            this.element = this.selectElement(selector);
            this.element.innerHTML += this.template;
        } catch (error) {
            this.element = null;
        }

        return this.element;
    }
    protected cleanHtml(selector: string) {
        try {
            this.element = this.selectElement(selector);
            this.element.innerHTML = '';
        } catch (error) {
            this.element = null;
        }
        return this.element;
    }

    protected outRender(selector: string) {
        try {
            this.element = this.selectElement(selector);
            this.element.outerHTML = this.template;
        } catch (error) {
            this.element = null;
        }
        return this.element;
    }

    private selectElement(selector: string) {
        const error = new Error('Invalid selector');
        if (!selector) throw error;
        const e = document.querySelector(selector);
        if (e === null) throw error;
        return e;
    }
}
