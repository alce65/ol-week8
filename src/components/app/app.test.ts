import { AboutPage } from '../../pages/about/about.js';
import { HomePage } from '../../pages/home/home.js';
import { TodoPage } from '../../pages/todo/todo.js';
import { Footer } from '../footer/footer.js';
import { Header } from '../header/header.js';
import { Menu } from '../menu/menu.js';
import { App } from './app.js';

jest.mock('../header/header.js');
jest.mock('../footer/footer.js');
jest.mock('../menu/menu.js');
jest.mock('../../pages/home/home.js');
jest.mock('../../pages/about/about.js');
jest.mock('../../pages/todo/todo.js');

describe('Given and instantiate "App" class', () => {
    beforeEach(() => {
        global.window = Object.create(window);
    });
    describe.skip('When location include a pathname "./index.html"', () => {
        Object.defineProperty(window, 'location', {
            value: {
                pathname: './index.html',
            },
        });
        test('Then the application components, included HomePage, should be instantiated ', () => {
            new App();
            expect(Header).toHaveBeenCalled();
            expect(Footer).toHaveBeenCalled();
            expect(Menu).toHaveBeenCalled();
            expect(HomePage).toHaveBeenCalled();
        });
    });
    describe('When location include a pathname "./todo.html"', () => {
        Object.defineProperty(window, 'location', {
            value: {
                pathname: './todo.html',
            },
        });
        test('Then the component AboutPage, should be instantiated', () => {
            new App();
            expect(TodoPage).toHaveBeenCalled();
        });
    });
    describe('When location include a pathname "./about.html"', () => {
        Object.defineProperty(window, 'location', {
            value: {
                pathname: './about.html',
            },
        });
        test('Then the component AboutPage, should be instantiated', () => {
            new App();
            expect(AboutPage).toHaveBeenCalled();
        });
    });
});
