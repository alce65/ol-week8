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
            new Menu('slot', this.menuOptions);
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
                new HomePage('.root');
                break;
            case this.menuOptions[1].path:
                new TodoPage('.root');
                break;
            case this.menuOptions[2].path:
                new AboutPage('.root');
                break;
        }
    }
}
