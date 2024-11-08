import addHeader from './content/header.js';
import addPractice from './content/practice.js';
import {loadPage,getData} from './utility/load.js';

getData('practice', data => {
    loadPage(() => addHeader(), () => addPractice(data));
});