import {setStyle} from './setStyle.js';
import {setIfElse} from './setIfElse.js';

const code = id => {
    if (id == 2) {
        setStyle();
    } else if (id == 3) {
        setIfElse();
    }
}

export {code};