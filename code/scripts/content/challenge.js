import setChallenge from './setChallenge.js';
import {resultModal} from '../components/modal.js';
import {randomArr} from '../utility/random.js';
import {saveBest} from '../utility/best.js';

let counter = 0;
let result = 0;
let startTimer;
let challengeId;
export default function addChallenge(data) {
    setChallenge(data);
    document.querySelector('.settings button').addEventListener('click', () => setQuestions(data));
}

function setQuestions(data) {
    const settings = document.querySelectorAll('.settings b');
    let time = settings[1].textContent;
    challengeId = data.id;
    const arrIndex = randomArr(data.task, settings[0].textContent, []);
    const all = data.task.map((item, index) => index);
    document.querySelector('.settings').remove();
    
    const arr = arrIndex.map((el) => {
        const answersArr = randomArr(all, 2, [el]);
        answersArr.sort(() => Math.random() - 0.5);
        const question = answersArr.map(item => data.task[item][1]);
        return {
            title: data.task[el][0],
            correct: data.task[el][1],
            question
        }
    });
    setClock(+time);
    fillQuestion(arr, 0);
    checkQuestion(arr); 
}

function checkQuestion(data) {
    const btn = document.querySelector('.btn-primary');
    document.querySelector('.question ul').onclick = function(e) {
        if (this !== e.target.parentElement ||
            this.className === 'filled') {
            return
        }
        this.className = 'filled';
        btn.disabled = false;
        btn.textContent = 'Далее';

        if (e.target.textContent == data[counter].correct) {
            e.target.className = 'correct';
            result += 100/data.length;
        } else {
            e.target.className = 'incorrect';
            document.querySelectorAll('.question li').forEach(el => {
                (el.textContent === data[counter].correct) ? el.className = 'correct' : '';
            });
        }
        counter++;
        if (counter === data.length) {
            finishResult();
            document.querySelector('.indicator').style.display = 'none';
        }
    };

    btn.onclick = () => {
        if (counter !== data.length) {
            fillQuestion(data, counter);
        }
    }
}

function finishResult() {
    clearInterval(startTimer);
    document.querySelector('.question ul').className = 'filled';
    const btn = document.querySelector('.btn-primary');
    btn.textContent = 'Завершить';
    btn.disabled = false;
    btn.addEventListener('click', () => {
        resultModal(result, 'челлендж');
        const btnModal = document.querySelector('.modal button');
        btnModal.textContent = 'Пройти ещё раз';
        btnModal.addEventListener('click', () => location.reload(true));
    });
    saveBest('challenge', challengeId, result);
}

function fillQuestion(data) {
    document.querySelector('.question').innerHTML = `
    <span>${counter + 1} / ${data.length}</span>
    <p>${data[counter].title}</p>
    <ul>
        <li>${data[counter].question[0]}</li>
        <li>${data[counter].question[1]}</li>
        <li>${data[counter].question[2]}</li>
    </ul>
    <button class="btn-primary" disabled>Выберите вариант</button>`;
    checkQuestion(data);
}

function setClock(time) {
    document.querySelector('.question-wrap').insertAdjacentHTML('beforebegin', `
    <div class="clock">
        <svg>
          <circle class="bg" cx="22" cy="22" r="17"/>
          <circle class="indicator" cx="22" cy="22" r="17"/>
        </svg>
        <b>${time}</b>
    </div>`); 

    const countDown = document.querySelector('.clock b');
    countDown.textContent = time;
    document.querySelector('.indicator').style.animationDuration = 
    `${time+(time*2.4)}s`;
    
    startTimer = setInterval(() => {
        if (time > 0) {
            time--;
            countDown.textContent = time;
        } else {
            finishResult();
        }
    }, 1000);
}