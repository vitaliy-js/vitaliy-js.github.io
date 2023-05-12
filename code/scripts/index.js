import {test} from './test.js';
import {practice} from './practice.js';
import {createPage,createContent} from './content/page.js';

createPage('main');

if (window.location.href.includes('test.html')) {
    test();
} else if (window.location.href.includes('practice.html')) {
    practice();
} else {
    createContent();
}