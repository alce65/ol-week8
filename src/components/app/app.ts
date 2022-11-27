import { AboutPage } from '../../pages/about/about.js';
import { HomePage } from '../../pages/home/home.js';
import { TodoPage } from '../../pages/todo/todo.js';
import { consoleDebug } from '../../tools/debug.js';
import { MenuOptionsType } from '../../types/menu.options.js';
import { Footer } from '../footer/footer.js';
import { Header } from '../header/header.js';
import { Menu } from '../menu/menu.js';

export class App {
    menuOptions: MenuOptionsType;
    constructor() {
        this.menuOptions = [
            { path: './index.html', label: 'Home' },
            { path: './todo.html', label: 'Task' },
            { path: './about.html', label: 'About' },
        ];
        try {
            new Header('.root');
            new Menu('header', this.menuOptions);
            this.router();
            new Footer('.root');
        } catch (error) {
            consoleDebug((error as Error).message);
        }
    }

    router() {
        const path = './' + location.pathname.split('/').at(-1);
        switch (path) {
            case this.menuOptions[0].path:
                return new HomePage('.root');
            case this.menuOptions[1].path:
                return new TodoPage('.root');
            case this.menuOptions[2].path:
                return new AboutPage('.root');
            default:
                throw new Error('Path no disponible');
        }
    }
}
