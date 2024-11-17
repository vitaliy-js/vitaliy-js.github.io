import addHeader from './content/header.js';
import addChallenge from './content/challenge.js';
import {loadPage,getData} from './utility/load.js';

getData('challenge', data => {
    loadPage(() => addHeader('result'), () => addChallenge(data));
});