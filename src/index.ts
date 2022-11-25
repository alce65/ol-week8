import { Sample } from './components/sample/sample.js';

(() => {
    document.addEventListener('DOMContentLoaded', () => {
        // const s = new Sample('.root');
        new Sample().outRender('.root');
    });
})();
