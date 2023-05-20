import {createPage} from './content/page.js';
import * as loader from './components/loader.js';
import {modal} from './components/modal.js';
import {dragDrop} from './components/dragdrop.js';
//import {unitPractice} from './utility/unitPractice.js';

const practice = () => {
    const getId = () => {
        if (window.location.href.includes('?id=')) {
            return window.location.href.split('?')[1].substring(3);
        } else {
            window.location.href = './err.html';
        }
    }

    const block = document.body;
    loader.showLoader(block);
    getTask(parseInt(getId()));

    async function getTask(task) {
        try {
            const res = await fetch(`./code/scripts/practice/practice${task}.json`);
            const data = await res.json();

            document.title = `Тренажёр ${data.title}`;
            createPage('practice');
            createPracticePage();
            createTask(data.practice);
            //unitPractice(data);
        } catch(err) {
            window.location.href = './err.html';
        }
        loader.hideLoader(block);
    }
}

function createTask(data) {
    let count = 0;
    addContent(data[count]);
    dragDrop();
    document.querySelector('.practice-drag>span').textContent = `1 / ${data.length}`;

    document.querySelector('.btn-secondary').addEventListener('click', e => {
        e.preventDefault();
        addContent(data[count]);
        dragDrop();
    });

    document.querySelector('.btn-primary').addEventListener('click', e => {
        e.preventDefault();
        const result = checkResult();
        modal(showModal);
        const modalText = document.querySelector('.modal-test p');
        const btnWrap = document.querySelector('.practice-btn-wrap');

        if (!result) {
            addContent(data[count]);
            dragDrop();
            modalText.innerHTML = `В команде ошибка<br>Попробуйте ещё раз`;
        } else {
            count++;
            if (count < data.length) {
                modalText.innerHTML = `Команда написана верно!`;
                addContent(data[count]);
                dragDrop();
                document.querySelector('.practice-drag>span').textContent = `${count+1} / ${data.length}`;
            } else {
                modalText.innerHTML = `Вы успешно выполнили все задания!`;
                btnWrap.innerHTML = `<button class="btn-primary task-repeat-btn">Пройти ещё раз</button>`;
                document.querySelector('.task-repeat-btn').addEventListener('click', () => {
                    btnWrap.innerHTML = `
                    <button class="btn-secondary">Очистить</button>
                    <button class="btn-primary">Проверить</button>`;
                    createTask(data);
                });
            }
        }
    });

    function checkResult() {
        const answerBox = document.querySelectorAll('.drag-wrap b');
        let result = true;

        for (let i = 0; i < data[count].correct.length; i++) {
            if (!answerBox[i] || answerBox[i].textContent !== data[count].correct[i]) {
                result = false;
                break;
            }
        }
        return result;    
    }

    function addContent(data) {
        document.querySelector('.header-text').innerHTML = data.task;
        document.querySelector('.drag-wrap').innerHTML = data.code;
        document.querySelector('.drag-panel').innerHTML = ``;
    
        for (let i = 0; i < data.answers.length; i++) {
            document.querySelector('.drag-panel').innerHTML += `
            <b id="${i+1}" draggable="true">${data.answers[i]}</b>`;
        }
    }
}

function createPracticePage() {
    document.querySelector('.content').classList.add('practice-content');
    document.querySelector('.content').innerHTML = `
    <div class="practice-wrap practice-drag">
        <span></span>
        <p class="header-text"></p>
        <div class="practice-task">
            <code class="drag-wrap"></code>
            <div class="practice-btn-wrap">
                <button class="btn-secondary">Очистить</button>
                <button class="btn-primary">Проверить</button>
            </div>
        </div>
        <div class="drag-panel"></div>
    </div>`;
}

function showModal() {
    document.querySelector('.modal').classList.add('modal-test');
    document.querySelector('.modal').innerHTML = `
    <p></p>
    <button class="btn-primary">OK</button>`;
}

export {practice};