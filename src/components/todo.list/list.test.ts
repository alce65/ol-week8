import { screen } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import { List } from './list';

describe('Given "List" component', () => {
    document.body.innerHTML = `<slot></slot>`;
    new List('slot');
    const elements = [
        screen.getByRole('heading', { name: 'Lita de tareas' }), // <h1>
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
