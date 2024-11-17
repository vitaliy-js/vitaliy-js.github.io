import {main} from '../../resources/main.js';
import {inProgress} from '../utility/inProgress.js';

export default function addMain() {
    document.querySelector('#header').insertAdjacentHTML('afterend', `
    <main>
        <div class="container">
            <div class="main-wrap">
                <div class="content">
                    <h2>Список разделов</h2>
                </div>
                <aside class="sidebar">
                    <h2>Быстрый переход:</h2>
                    <ol class="sidebar-list"></ol>
                </aside>
            </div>
        </div>
    </main>
    <a href="#header" class="scroll-top"></a>`);
    addLessons();
}

function addLessons() {
    const content = document.querySelector('.content');
    const aside = document.querySelector('.sidebar-list');

    for (let i = 0; i < main.length; i++) {
        aside.insertAdjacentHTML('beforeend', `
        <li><a href="#lesson-${i+1}">${i+1}-Раздел</a></li>`);

        content.insertAdjacentHTML('beforeend', `
        <div class="lesson" id="lesson-${i+1}">
            <h3>${i+1}. ${main[i].name}</h3>
            <ul>${setItems(main[i])}</ul>
        </div>`);
    }
    
    if (document.querySelector('.in-progress')) {
        inProgress();
    }
}

function setItems(obj) {
    let item = '';
    delete obj.name;
    for (let key in obj) {
        obj[key].forEach((el, index, arr) => {
            item +=`<li class="${key}"><a href="${(key === 'materials') ? `code/resources/materials/${el}` : el}" 
            ${(key !== 'video') ? '' : 'target="_blank"'}
            ${(el !== '') ? '' : 'class="in-progress"'}>
            ${setNames(key, arr.length, index)}</a></li>`; 
        });
    }
    return item;
}

function setNames(key, length, index) {
    let val;
    switch (key) {
        case 'test': 
            val = 'Тест';
            break;
        case 'practice': 
            val = 'Тренажёр';
            break;
        case 'challenge': 
            val = 'Челлендж';
            break;
        case 'materials': 
            val = 'Материалы';
            break;
        case 'video': 
            val = 'Видео';
            break;
        case 'article': 
            val = 'Статья';
            break;
    }

    if (length > 1) {
        val += `-${index+1}`;
    }
    return val;
}