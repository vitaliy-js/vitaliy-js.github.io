import {modal} from '../components/modal.js';

const setIfElse = () => {
    const data = getData();
    let count = 0;
    createPage(data[count]);
    startPractice();
    document.querySelector('.practice-drag>span').textContent = `1 / ${data.length}`;

    document.querySelector('.btn-secondary').addEventListener('click', e => {
        e.preventDefault();
        createPage(data[count]);
        startPractice();
    });

    document.querySelector('.btn-primary').addEventListener('click', e => {
        e.preventDefault();
        const result = checkResult();
        modal(showModal);
        const modalText = document.querySelector('.modal-test p');

        if (!result) {
            createPage(data[count]);
            startPractice();
            modalText.innerHTML = `В команде ошибка<br>Попробуйте ещё раз`;
        } else {
            count++;
            if (count < data.length) {
                modalText.innerHTML = `Команда написана верно!`;
                createPage(data[count]);
                startPractice();
                document.querySelector('.practice-drag>span').textContent = `${count+1} / ${data.length}`;
            } else {
                modalText.innerHTML = `Вы успешно выполнили все задания!`;
                document.querySelectorAll('.practice-btn-wrap button').forEach(el => el.disabled = true);
            }
        }
    });

    function startPractice() {
        const box = document.querySelectorAll('.drag-wrap span');

         //Make draggable, highlight area
        box.forEach(el => {
            el.ondragover = e => e.preventDefault()
            el.addEventListener('dragenter', () => el.classList.add('dragging'));
            el.addEventListener('dragleave', () => el.classList.remove('dragging'));
            el.addEventListener('drop', () => el.classList.remove('dragging'));
        });

        //Store id of draggable card
        document.querySelectorAll('.drag-panel b').forEach(el => {
            el.ondragstart = e => e.dataTransfer.setData('id', e.target.id);
        });

        box.forEach(el => {
            el.ondrop = e => {
                const exampleId = e.dataTransfer.getData('id');
                const card = document.getElementById(exampleId);
                e.target.appendChild(card);
            }
        });
    }

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
}

function createPage(data) {
    document.querySelector('.header-text').innerHTML = data.task;
    document.querySelector('.drag-wrap').innerHTML = data.code;
    document.querySelector('.drag-panel').innerHTML = ``;

    for (let i = 0; i < data.answers.length; i++) {
        document.querySelector('.drag-panel').innerHTML += `
        <b id="${i+1}" draggable="true">${data.answers[i]}</b>`;
    }
}

function getData() {
    return [
        {
            task: `Создайте условие для предоставления скидки в проездном билете:<br> <span>младенцы</span> (0-2 года) - 50%; <span>дети</span> (3-11) - 25%; <span>взрослые</span> (от 12 - 0%)`,
            code: `let discount;<br>
            <span></span> (age <span></span> 3) {<br>
                <i>discount = 50%;</i>
            } <span></span> (age <span></span> 12) {<br>
                <i>discount = 25%;</i>
            } <span></span> {<br>
                <i>discount = 0%;</i>}`,
            answers: ['if', 'else if', 'else', '===', '>', '<', '>', '<'],
            correct: ['if', '<', 'else if', '<', 'else']
        },
        {
            task: `Создайте условие для предоставления скидки в проездном билете:<br> <span>младенцы</span> (0-2 года) - 50%; <span>дети</span> (3-11) - 25%; <span>взрослые</span> (от 12 - 0%)`,
            code: `let discount;<br>
            <span></span> (age <span></span> 3) {<br>
                <i>discount = 50%;</i>
            } <span></span> (age <span></span> 12) {<br>
                <i>discount = 25%;</i>
            } <span></span> {<br>
                <i>discount = 0%;</i>}`,
            answers: ['if', 'else if', 'else', '===', '>', '<', '>', '<'],
            correct: ['if', '<', 'else if', '<', 'else']
        },
        {
            task: `Создайте условие для предоставления скидки в проездном билете:<br> <span>младенцы</span> (0-2 года) - 50%; <span>дети</span> (3-11) - 25%; <span>взрослые</span> (от 12 - 0%)`,
            code: `let discount;<br>
            <span></span> (age <span></span> 3) {<br>
                <i>discount = 50%;</i>
            } <span></span> (age <span></span> 12) {<br>
                <i>discount = 25%;</i>
            } <span></span> {<br>
                <i>discount = 0%;</i>}`,
            answers: ['if', 'else if', 'else', '===', '>', '<', '>', '<'],
            correct: ['if', '<', 'else if', '<', 'else']
        },
        {
            task: `Создайте условие для предоставления скидки в проездном билете:<br> <span>младенцы</span> (0-2 года) - 50%; <span>дети</span> (3-11) - 25%; <span>взрослые</span> (от 12 - 0%)`,
            code: `let discount;<br>
            <span></span> (age <span></span> 3) {<br>
                <i>discount = 50%;</i>
            } <span></span> (age <span></span> 12) {<br>
                <i>discount = 25%;</i>
            } <span></span> {<br>
                <i>discount = 0%;</i>}`,
            answers: ['if', 'else if', 'else', '===', '>', '<', '>', '<'],
            correct: ['if', '<', 'else if', '<', 'else']
        },
        {
            task: `Создайте условие для предоставления скидки в проездном билете:<br> <span>младенцы</span> (0-2 года) - 50%; <span>дети</span> (3-11) - 25%; <span>взрослые</span> (от 12 - 0%)`,
            code: `let discount;<br>
            <span></span> (age <span></span> 3) {<br>
                <i>discount = 50%;</i>
            } <span></span> (age <span></span> 12) {<br>
                <i>discount = 25%;</i>
            } <span></span> {<br>
                <i>discount = 0%;</i>}`,
            answers: ['if', 'else if', 'else', '===', '>', '<', '>', '<'],
            correct: ['if', '<', 'else if', '<', 'else']
        }
    ];
}

function showModal() {
    document.querySelector('.modal').classList.add('modal-test');
    document.querySelector('.modal').innerHTML = `
    <p></p>
    <button class="btn-primary">OK</button>`;
}

export {setIfElse}