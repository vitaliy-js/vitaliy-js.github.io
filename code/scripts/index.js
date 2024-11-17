import addHeader from './content/header.js';
import addMain from './content/main.js';
import {loadPage} from './utility/load.js';

loadPage(() => addHeader('main'), addMain);