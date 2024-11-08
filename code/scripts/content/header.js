export default function addHeader(type) {
    document.body.insertAdjacentHTML('afterbegin', `
    <header id="header">
        <div class="container">
            <div class="header-wrap ${(type === 'main') ? 'header-main' : ''}">
                <a class="header-wrap-logo" ${(type !== 'main') ? 'href="./"' : ''}>
                    <img src="code/img/logo.png">
                    <h1>Vitaliy html</h1>
                </a>
                ${(type === 'result') ? '<p class="header-result">Лучший результат: <b>0%</b></p>' : ''}
            </div>
            ${(type === 'main') ?
            '<p class="header-text">Ниже представлены ссылки на видео, материалы и тесты<br> для изучения <b>JavaScript</b> языка</p>' : ''}
        </div>
    </header>`);
}