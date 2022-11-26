import { screen } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import { TodoPage } from './todo';

describe('Given "TodoPage" component', () => {
    document.body.innerHTML = `<slot name="page"></slot>`;
    new TodoPage('slot[name="page"]');
    const elements = [
        screen.getByRole('heading', { name: 'Tareas' }), // <h2>
    ];
    describe.each(elements)(
        'When it is call with a DOM implementation',
        (element: HTMLElement) => {
            test(`Then ${element.tagName} should be render`, () => {
                expect(element).toBeInstanceOf(HTMLElement);
                expect(element).toBeInTheDocument();
            });
        }
    );
});