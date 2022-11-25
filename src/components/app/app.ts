import { AboutPage } from '../../pages/about/about.js';
import { HomePage } from '../../pages/home/home.js';
import { MenuOptionsType } from '../../types/menu.options.js';
import { Footer } from '../footer/footer.js';
import { Header } from '../header/header.js';
import { Menu } from '../menu/menu.js';

export class App {
    menuOptions: MenuOptionsType;
    constructor() {
        this.menuOptions = [
            { path: './index.html', label: 'Home' },
            { path: './about.html', label: 'About' },
        ];
        new Header('.root');
        new Menu('slot', this.menuOptions);
        if (location.pathname.includes('index')) {
            new HomePage('.root');
        } else {
            new AboutPage('.root');
        }
        new Footer('.root');
    }
}
