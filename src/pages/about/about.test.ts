import { screen } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import { AboutPage } from './about';

describe('Given "AboutPage" component', () => {
    document.body.innerHTML = `<slot></slot>`;
    new AboutPage('slot');
    const elements = [
        screen.getByRole('heading', { name: 'About' }), // <h2>
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
