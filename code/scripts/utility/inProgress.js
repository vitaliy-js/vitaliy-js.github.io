import {createModal} from '../components/modal.js';

function inProgress() {
    document.querySelectorAll('.in-progress').forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            createModal();
            document.querySelector('.modal').insertAdjacentHTML('afterbegin',`
            <img src="code/img/in-progress.png" width="250px">
            <p>Данный контент прямо сейчас создаётся и скоро будет готов</p>`);
        });
    });
}

export {inProgress};