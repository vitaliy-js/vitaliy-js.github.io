import addHeader from './content/header.js';
import addPlan from './content/plan.js';
import {loadPage} from './utility/load.js';

loadPage(() => addHeader('plan'), addPlan);