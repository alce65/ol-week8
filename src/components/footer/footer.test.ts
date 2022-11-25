import { screen } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import { Footer } from './footer';

describe('Given "Footer" component', () => {
    document.body.innerHTML = `<slot></slot>`;
    new Footer('slot');
    const elements = [
        screen.getByRole('contentinfo'), //<footer />
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
