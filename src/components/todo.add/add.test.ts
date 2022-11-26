import { screen } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import { Add } from './add';

describe('Given "Add" component', () => {
    document.body.innerHTML = `<slot></slot>`;
    new Add('slot', () => {
        //
    });
    const elements = [
        screen.getByRole('heading', { name: 'Añadir tarea' }), // <h1>
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
