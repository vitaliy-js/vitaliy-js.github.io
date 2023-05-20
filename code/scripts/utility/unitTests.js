import {finishTest} from '../test.js';

const unitTests = data => {
    createBtn();
    checkTitle(data);
    setStorage(data.id);
    const correctNumber = correctVal => Math.round(+data.test.length * correctVal / 100);

    const resultVal = document.querySelector('.check-btn-unit+b');
    document.querySelector('.check-btn-unit').onclick = () => {
        if (resultVal.textContent == 0) {
            checkTest(resultVal.textContent);
            resultVal.textContent = 70;
        } else if (resultVal.textContent == 70) {
            markVar(70);
            checkTest(resultVal.textContent);
            resultVal.textContent = 80;
        } else if (resultVal.textContent == 80) {
            markVar(80);
            checkTest(resultVal.textContent);
            resultVal.textContent = 90;
        } else if (resultVal.textContent == 90) {
            markVar(90);
            checkTest(resultVal.textContent);
            resultVal.textContent = 100;
        } else if (resultVal.textContent == 100) {
            markVar(100);
            checkTest(resultVal.textContent);
        }
    }

    function markVar(correctVal) {
        const question = document.querySelectorAll('.test-list');

        for (let i = 0; i < correctNumber(correctVal); i++) {
           question[i].querySelectorAll('input')[data.test[i].correct].checked = true;
        }
    }

    function checkTest(result) {
        finishTest(document.querySelector('.test-btn'), data.test, data.id);
        const storage = localStorage.getItem('js-test').split(',')[+data.id - 1];
        const modalText = document.querySelector('.modal-test p');
        const resultTest = Math.round(correctNumber(result)*100/data.test.length);

        if (document.querySelector('.modal-test b').textContent != `${resultTest}%`) {
            console.log('Error in modal');
        }
        if (document.querySelector('.header-result b').textContent != `${resultTest}%`) {
            console.log('Error in header');
        }
        if (storage != resultTest) {
            console.log('Error in storage');
        }

        if (resultTest < 80 && !modalText.textContent.includes('Вы можете пройти тест ещё раз')) {
            console.log('Error in modal text');
        } else if (resultTest >= 80 && resultTest < 100 && !modalText.textContent.includes('Вы успешно прошли тест')) {
            console.log('Error in modal text');
        } else if (resultTest == 100 && !modalText.textContent.includes('Поздравляем!!!')) {
            console.log('Error in modal text');
            document.querySelector('.header-result b').classList.contains('best-result');
        }
    }
}

function checkTitle(data) {
    if (document.title !== `Тест ${data.title}`) {
        console.log('Error in title');
    }
}

function setStorage(index) {
    if (!localStorage.getItem('js-test')) {
        localStorage.setItem('js-test', [0,0,0,0,0]);
    } else {
        const arr = localStorage.getItem('js-test').split(',');
        arr[index-1] = 0;
        localStorage.setItem('js-test', arr);
    }
}

function createBtn() {
    const checkBtn = document.createElement('div');
    checkBtn.innerHTML = `
    <button class="btn-primary check-btn-unit">Check test</button>
    <b>0</b>`
    document.body.append(checkBtn);
}

export {unitTests};