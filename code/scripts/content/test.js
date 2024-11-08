import {setBest, saveBest} from '../utility/best.js';
import {resultModal} from '../components/modal.js';

export default function addTest(data) {
    document.title = `Тест. ${data.title}`;
    document.querySelector('#header').insertAdjacentHTML('afterend', `
    <main>
        <div class="container">
            <div class="main-wrap">
                <div class="content">
                    <h2>${data.title}</h2>
                    <ol class="test-wrap"></ol>
                    <button class="btn-primary test-btn">Завершить тест</button>
                </div>
            </div>
        </div>
    </main>
    <a href="#header" class="scroll-top"></a>`);
    setItem(data.test);
    setBest('test', data.id);

    document.querySelector('.test-btn').addEventListener('click', e => {
        if (e.target.textContent === 'Завершить тест') {
            finishTest(e.target, data);
        } else {
            location.reload(true);
        }
    });
}

function finishTest(btn, data) {
    const label = document.querySelectorAll('.test-list label');
    const answer = document.querySelectorAll('.test-list input');
    const getOrder = el => el.name.slice(-1);
    let count = 0;

    for (let i = 0; i < answer.length; i++) {
        if (answer[i].checked && 
            data.test[getOrder(answer[i])].correct == answer[i].value) {
            count += 100/data.test.length;
            label[i].className = 'test-correct';
        } else if (answer[i].checked) {
            label[i].className = 'test-incorrect';
        }
        answer[i].disabled = true;
        label[i].style.cursor = 'default';
    }
    
    count = Math.round(count);
    btn.textContent = 'Пройти ещё раз';
    resultModal(count, 'тест');
    saveBest('test', data.id, count);
}

//Set test
function setItem(data) {
    const list = document.querySelector('.test-wrap');

    for (let i = 0; i < data.length; i++) {
        list.insertAdjacentHTML('beforeend', `
        <li class="test">
        <h3>${i+1}. ${data[i].question}</h3>
        <ul class="test-list">${addAnswers(data[i].answer, i)}</ul>`);
    }
}
function addAnswers(answers, index) {
    let list = '';
    for (let i = 0; i < answers.length; i++) {
        list += 
        `<li>
            <label>
                <input type="radio" name="question-${index}" value="${i}">
                <span>${answers[i]}</span>
            </label>
        </li>`;
    }
    return list;
}