import { Footer } from './components/footer/footer.js';
import { Header } from './components/header/header.js';
import { Menu } from './components/menu/menu.js';
import { AboutPage } from './pages/about/about.js';
import { HomePage } from './pages/home/home.js';
import { MenuOptionsType } from './types/menu.options.js';

const app = () => {
    const menuOptions: MenuOptionsType = [
        { path: './index.html', label: 'Home' },
        { path: './about.html', label: 'About' },
    ];
    new Header('.root');
    new Menu('slot', menuOptions);
    if (location.pathname.includes('index')) {
        new HomePage('.root');
    } else {
        new AboutPage('.root');
    }
    new Footer('.root');
};

(() => {
    document.addEventListener('DOMContentLoaded', app);
})();
