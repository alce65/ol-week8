import { screen } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import { Item } from './item';

describe('Given "Item" component', () => {
    document.body.innerHTML = `<slot></slot>`;
    new Item('slot');
    const elements = [
        ...screen.getAllByRole('listitem'), // <li />
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
