import {dragDrop} from '../components/drag.js';

export default function addPractice(data) {
    document.title = `Тренажёр. ${data.title}`;
    document.querySelector('#header').insertAdjacentHTML('afterend', `
    <main>
        <div class="container">
            <div class="main-wrap">
                <div class="content practice-content">
                    <div class="practice-wrap practice-drag">
                        <span></span>
                        <p class="header-text"></p>
                        <div class="practice-task">
                            <code class="drag-wrap"></code>
                            <div class="practice-btn-wrap">
                                <button class="btn-secondary">Очистить</button>
                                <button class="btn-primary">Далее</button>
                            </div>
                        </div>
                        <div class="drag-panel"></div>
                    </div>
                </div>
            </div>
        </div>
    </main>`);
    fillTask(data, 0);
}

function fillTask(data, index) {
    const panel = document.querySelector('.drag-panel');
    const task = document.querySelector('.header-text');
    const practice = data.practice;
    task.className = 'header-text';
    panel.innerHTML = '';

    document.querySelector('.practice-wrap>span').textContent = `${index+1} / ${practice.length}`;
    task.innerHTML = practice[index].task;
    document.querySelector('.drag-wrap').innerHTML = practice[index].code;
    practice[index].answers.forEach((el, index) => {
        panel.insertAdjacentHTML('beforeend', 
        `<b id="${index+1}" draggable="true">${el}</b>`)
    });

    dragDrop(() => checkPractice(data, index));

    document.querySelectorAll('.practice-btn-wrap button').forEach(el => {
        el.addEventListener('click', () => {
            if (el.classList.contains('btn-secondary')) {
                fillTask(data, index);
            } else if (practice.length - 2 < index) {
                location.reload(true);
            } else {
                if (practice.length - 2 === index) {
                    el.textContent = 'Завершить';
                }
                fillTask(data, index + 1);
            }
        });
    });
}

function checkPractice(data, index) {
    const box = document.querySelectorAll('.drag-wrap span');
    const task = document.querySelector('.header-text');
    const arr = Array.from(box).filter(el => 
        data.practice.length - el.firstElementChild);
    
    if (arr.length === 0) {
        const correct = data.practice[index].correct;
        for (let i = 0; i < box.length; i++) {
            if (box[i].textContent !== correct[i]) {
                task.classList.add('incorrect');
                return;
            }
        }
        task.classList.add('correct');
    }
}