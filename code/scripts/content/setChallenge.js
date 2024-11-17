import {createModal} from '../components/modal.js';
import {radio} from '../components/radio.js';
import {setBest} from '../utility/best.js';

export default function setChallenge(data) {
    document.title = `Челлендж. ${data.title}`;
    createPreview(data.title);
    setBest('challenge', data.id);
    const settings = document.querySelectorAll('.settings b'); 

    document.querySelector('.settings ul').addEventListener('click', () => setSettings(settings));
}

function setSettings(settings) {
    createModal();
    createSettings();
    document.querySelector('.modal button').textContent = 'Подтвердить';
    const listRadio = document.querySelectorAll('.radio ul');

    //SetDefault
    settings.forEach((el, index) => {
        const radioItem = Array.from(listRadio[index].children)
        .find(item => item.textContent == el.textContent);
        
        radioItem.className = 'radio-checked';
        radio(listRadio[index]);
    });

    //Change settings
    document.querySelector('.modal-btn').addEventListener('click', () => {
        const checked = document.querySelectorAll('.radio-checked');
        settings[0].textContent = checked[0].textContent;
        settings[1].textContent = checked[1].textContent;
    });
}

function createPreview(title) {
    document.querySelector('#header').insertAdjacentHTML('afterend', `
    <main>
        <div class="container">
            <div class="main-wrap">
                <div class="content">
                    <div class="settings">
                        <h2>${title}</h2>
                        <ul>
                            <li>Вопросы: <b>5</b></li>
                            <li>Время: <b>30</b></li>
                        </ul>
                        <button class="btn-primary">Начать</button>
                    </div>
                    <div class="question-wrap">
                        <div class="question"></div>
                    </div>
                </div>
            </div>
        </div>
    </main>`);
}
function createSettings() {
    document.querySelector('.modal').insertAdjacentHTML('afterbegin', `
    <h2>Настройки челленджа</h2>
    <div class="radio radio-first">
        <span>Вопросы:</span>
        <ul>
            <li>5</li>
            <li>10</li>
        </ul>
    </div>
    <div class="radio">
        <span>Время:</span>
        <ul>
            <li>15</li>
            <li>30</li>
            <li>45</li>
        </ul>
    </div>`);
}