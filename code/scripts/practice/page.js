const page = () => 
[
    {
        id: 2,
        title: 'Тренажёр | Атрибут style',
        content: `
        <div class="practice-wrap">
            <p class="header-text">Данный тренажёр позволяет изменять значения в атрибуте <span>style</span></p>
            <code><span>&lt;p&gt;</span>Hello World!<span>&lt;/p&gt;</span></code>
            <form class="practice-form">
                <span>const field = document.querySelector('p');</span>
                <label>field.style.<input value="color = \'purple\';"></label>
                <button class="btn-primary">Применить</button>
            </form>
            <div class="practice-example">
                <p style="color:purple">Hello World!</p>
                <p class="practice-error">В коде может быть ошибка</p>
            </div>
        </div>`
    },
    {
        id: 3,
        title: 'Тренажёр | Оператор if else',
        content: `
        <div class="practice-wrap practice-drag">
            <span></span>
            <p class="header-text"></p>
            <form class="practice-form">
                <code class="drag-wrap"></code>
                <div class="practice-btn-wrap">
                    <button class="btn-secondary">Очистить</button>
                    <button class="btn-primary">Проверить</button>
                </div>
            </form>
            <div class="drag-panel"></div>
        </div>`
    }
];   


export {page};