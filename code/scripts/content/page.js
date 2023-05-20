import {content} from './content.js';

const createPage = type => {
    document.body.innerHTML = `
    <header id="header">
        <div class="container">
            <div class="header-wrap  ${(type !== 'main') ? 'header-secondary-wrap' : '' }">
                <a class="header-wrap-logo" href="./">
                    <img src="code/img/logo.svg" alt="Лого JavaScript уроки">
                    <h1>уроки</h1>
                </a>
                ${(type === 'test') ? '<p class="header-result"></p>' : ''}
                <a class="header-btn" href="https://www.youtube.com/@vitaliyhtml" target="_blank" title="YouTube-канал"></a>
            </div>
            ${(type === 'main') ?
            '<p class="header-text">Ниже представлены ссылки на видео, материалы и тесты<br> для изучения <span>JavaScript</span> языка</p>' : ''}
        </div>
    </header>
    <main>
        <div class="container">
            <div class="main-wrap">
                <div class="content">
                    <h2>Список уроков</h2>
                </div>
                ${(type === 'main') ?
                `<aside class="sidebar">
                    <h2>Быстрый переход:</h2>
                    <ol class="sidebar-list"></ol>
                </aside>` : ''}
            </div>
        </div>
    </main>
    ${(type !== 'practice') ?
    `<a href="#header" class="scroll-top"></a>
    ` : ''}
    <script type="module" src="code/scripts/index.js"></script>`;
}

const createContent = () => {
    const data = content();

    for (let i = 0; i < data.length; i++) {
        document.querySelector('.content').innerHTML += `
            <div class="lesson" id="lesson-${i+1}">
            <h3>${i+1}. ${data[i].lesson}</h3>
            <ol class="lesson-list">
                ${(i !== 0) ? '' : '<li class="video-link"><a href="https://youtu.be/lkYcHIByZAI" target="_blank">Вступление</a></li>'}
                <li class="video-link"><a href="${data[i].list.mainVideo}" target="_blank">Ссылка на урок</a></li>
                <li class="book-link"><a href="${data[i].list.materials}">Материалы</a></li>
                <li class="test-link"><a href="/test.html?id=${i+1}">Тест</a></li>
                ${(!data[i].list.codePractice) ? '' : `
                <li class="practice-link"><a href="/practice.html?id=${i+1}">Тренажёр</a></li>`}
                ${(data[i].list.practice.length === 0) ? '' : getPractice(data[i].list.practice)}
            </ol>
        </div>`;

        document.querySelector('.sidebar-list').innerHTML += `
        <li><a href="#lesson-${i+1}">${i+1}-Урок</a></li>`;
    }
}

function getPractice(practiceArr) {
    let list = '';
    for (let i = 0; i < practiceArr.length; i++) {
        list += `
        <li class="video-link"><a href="${practiceArr[i]}" target="_blank">
        Практика${(practiceArr.length > 1) ? `-${i+1}` : ''}</a></li>`;
    }
    return list;
}

export {createPage, createContent};