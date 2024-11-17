import addHeader from './content/header.js';
import addTest from './content/test.js';
import {loadPage,getData} from './utility/load.js';

getData('test', data => {
    loadPage(() => addHeader('result'), () => addTest(data));
});