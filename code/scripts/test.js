import {createPage} from './content/page.js';
import * as loader from './components/loader.js';
import {modal} from './components/modal.js';
//import {unitTests} from './utility/unitTests.js';

const test = () => {
    const getTestId = () => {
        if (window.location.href.includes('?id=')) {
            return window.location.href.split('?')[1].substring(3);
        } else {
            window.location.href = './err.html';
        }
    }
    const block = document.body;
    loader.showLoader(block);
    getTestData(parseInt(getTestId()));

    async function getTestData(id) {
        try {
            const res = await fetch(`./code/scripts/tests/test${id}.json`);
            const data = await res.json();
            createPage('test');
            createTest(data, id);
            //unitTests(data);
        }
        catch(err) {
            window.location.href = './err.html';
        }
        loader.hideLoader(block);
    }
}

function createTest(data, id) {
    setBest(id);
    document.querySelector('.content').innerHTML = `
    <h2></h2>
    <ol class="test-wrap"></ol>
    <p class="test-result"></p>
    <button class="btn-primary test-btn">Завершить тест</button>`;
    const testWrap = document.querySelector('.test-wrap');
    document.title = `Тест ${data.title}`;
    document.querySelector('h2').textContent = data.title;
    
    for (let i = 0; i < data.test.length; i++) {
        testWrap.innerHTML += `
        <li class="test">
            <h3>${i+1}. ${data.test[i].question}</h3>
            <ul class="test-list"></ul>
        </li>`;    
        for (let j = 0; j < data.test[i].answer.length; j++) {
            document.querySelectorAll('.test-list')[i].innerHTML += `
            <li>
                <label>
                    <input type="radio" name="question-${i}" value="${j}"><span>${data.test[i].answer[j]}</span>
                </label>
            </li>`;
        }       
    }
    document.querySelector('.test-btn').addEventListener('click', e => {
        if (e.target.textContent === 'Завершить тест') {
            finishTest(e.target, data.test, id);
        } else {
            test();
            window.scrollTo(0,0);
        }
    });
}

function finishTest(btn, data, id) {
    const label = document.querySelectorAll('.test-list label');
    const answer = document.querySelectorAll('.test-list input');
    const getOrder = el => el.name.slice(-1);
    let count = 0;

    for (let i = 0; i < answer.length; i++) {
        if (answer[i].checked 
            && data[getOrder(answer[i])].correct == answer[i].value) {
            count += 100/data.length;
            label[i].classList.add('test-correct');
        } else if (answer[i].checked) {
            label[i].classList.add('test-incorrect');
        }
        answer[i].disabled = true;
        label[i].style.cursor = 'default';
    }
    count = Math.round(count);
    showModal(count);
    saveResult(count, id);

    document.querySelector('.test-result').innerHTML = `Ваш результат: <span>${count}%</span>`;
    btn.textContent = 'Пройти ещё раз';
}

function showModal(count) {
    modal(testModal);
    const modalText = document.querySelector('.modal-test p');
    if (count >= 100) {
        modalText.textContent = 'Поздравляем!!!';
        document.querySelector('.modal').classList.add('modal-baloon');
    } else if (count >= 80) {
        modalText.textContent = 'Вы успешно прошли тест';
    } else {
        modalText.textContent = 'Вы можете пройти тест ещё раз';
    }
    modalText.innerHTML += `<br>Ваш результат: <b>${count}%</b>`;
}

function testModal() {
    document.querySelector('.modal').classList.add('modal-test');
    document.querySelector('.modal').innerHTML = `
    <p></p>
    <button class="btn-primary">OK</button>`;
}

function saveResult(count, id) {
    if (!localStorage.getItem('js-test')) {
        localStorage.setItem('js-test', [0,0,0,0,0]);
    }

    const arr = localStorage.getItem('js-test').split(',');
    if (arr[id-1] < count) {
        arr[id-1] = count;
        localStorage.setItem('js-test', arr);
        setBest(id);
    }
}

function setBest(id) {
    const text = document.querySelector('.header-result');
    if (!localStorage.getItem('js-test')) {
        text.innerHTML = `Лучший результат: <b>0%</b>`;
    } else {
        const arr = localStorage.getItem('js-test').split(',');
        text.innerHTML = `Лучший результат: <b>${arr[id-1]}%</b>`;
        if (arr[id-1] >= 100) {
            text.classList.add('best-result');
        }
    }
}

export {test,finishTest};