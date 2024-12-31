import {main} from '../../resources/plan.js';

export default function addMain() {
    document.querySelector('#header').insertAdjacentHTML('afterend', `
    <main>
        <div class="container">
            <div class="main-wrap">
                <div class="content">
                    <h2>Программа курса</h2>
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
            <a href="${main[i].link}" target="_blank"><h3>${i+1}. ${main[i].name}</h3></a>
            <p>${main[i].description}</p>
            <div class="lesson-list-wrap">
                <ol>${setItems(main[i].lessons, i + 1)}</ol>
                <div style="background-image: url(code/img/lessons/${i+1}_chapter.png)"></div>
            </div>
        </div>`);
        if (i === main.length - 1) {
            document.querySelectorAll('.lesson')[i].children[0].outerHTML = `<h3>${i+1}. ${main[i].name}</h3>`;
        }
    }
}
//
function setItems(arr, index) {
    let item = '';
    for (let i = 0; i < arr.length; i++) {
        item +=`<li>${index}.${i + 1}. ${arr[i]}</li>`; 
    }
    return item;
}