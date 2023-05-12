import {createPage} from './content/page.js';
import {page} from './practice/page.js';
import {code} from './practice/code.js';

const practice = () => {
    const getId = () => {
        if (window.location.href.includes('?id=')) {
            return window.location.href.split('?')[1].substring(3);
        } else {
            window.location.href = './err.html';
        }
    }
    createPage('practice');
    const practiceId = parseInt(getId());
    const data = page().filter(item => item.id == practiceId);
    document.title = data[0].title;
    
    document.querySelector('.content').innerHTML = data[0].content;
    document.querySelector('.content').classList.add('practice-content');
    document.querySelector('.scroll-top').style.display = 'none';
    code(practiceId);
}

export {practice};