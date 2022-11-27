export abstract class Component {
    protected template!: string;
    private element!: Element | null;

    render() {
        return this.element;
    }

    // Renders use
    // footer innRender
    // header innRender
    // menu innRender
    // task.item innRender + eventListeners
    // pages innRender
    // task.list cleanHTML + innRender
    // sample cleanHTML + innRender
    // task.add innRender-start + eventListeners...

    protected innRender(selector: string, position: 'start' | 'end' = 'end') {
        type validChild = 'firstElementChild' | 'lastElementChild';
        const positions = {
            start: { position: 'afterbegin', chid: 'firstElementChild' },
            end: { position: 'beforeend', chid: 'lastElementChild' },
        };
        try {
            this.element = this.selectElement(selector);
            // this.element.innerHTML += this.template;
            this.element.insertAdjacentHTML(
                positions[position].position as InsertPosition,
                this.template
            );
            const c = positions[position].chid as validChild;
            this.element = this.element[c] as Element;
            console.log('Element', this.element);
            console.log('Parent', this.element.parentElement);

            // this.element = this.selectElement(selector).lastElementChild;
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

    private selectElement(selector: string): Element {
        const error = new Error('Invalid selector');
        if (!selector) throw error;
        const e = document.querySelector(selector);
        if (e === null) throw error;
        return e;
    }
}
