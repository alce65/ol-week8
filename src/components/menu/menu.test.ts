import { screen } from '@testing-library/dom';
// adds special assertions like toHaveTextContent
import '@testing-library/jest-dom';
import { MenuOptionsType } from '../../types/menu.options.js';
import { Menu } from './menu';

const menuOptionsMock: MenuOptionsType = [
    { label: 'Test option 1', path: '' },
    { label: 'Test option 2', path: '' },
];
describe('Given "Menu" component', () => {
    document.body.innerHTML = `<slot></slot>`;
    new Menu('slot', menuOptionsMock);
    const elements = [
        screen.getByRole('navigation'), // <nav class="menu"/>
        screen.getByRole('list'), // <ul />
        ...screen.getAllByRole('listitem'), // <li />
        screen.getByRole('link', { name: 'Test option 1' }),
        screen.getByRole('link', { name: 'Test option 2' }),
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
describe(`Given "Menu" component, 
    When it is instantiate with a invalid DOM selector`, () => {
    const result = new Menu('.invalid', menuOptionsMock);
    test('No element should be render', () => {
        expect(result.render()).toBeFalsy();
    });
});
