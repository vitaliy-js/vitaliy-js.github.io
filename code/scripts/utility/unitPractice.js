const unitPractice = data => {
    const btn = document.querySelectorAll('.practice-btn-wrap button');
    let progress = 1;
    createBtn();
    const btnUnit = document.querySelector('.check-btn-unit');
    btnUnit.style.border = '3px solid blue';
    checkTitle();
    checkProgress();
    checkEmpty();
    addComponent(data, progress);

    btnUnit.onclick = () => {
        btnUnit.style.border = 'none';
        checkProgress();
        addComponent(data, progress);
        checkClear();
    }

    function checkClear() {
        btn[0].style.border = '3px solid blue';
        document.querySelector('.practice-btn-wrap .btn-secondary').onclick = () => {
            btn[0].style.border = '1px solid #eb582cd1';
            checkEmpty();
            setTimeout(() => checkIncorrect(), 200);
        }
    }

    function checkIncorrect() {
        addComponent(data, progress);
        document.querySelector('.drag-wrap span b:last-child').textContent = 'Incorrect';
        btn[1].style.border = '3px solid blue';
        btn[1].onclick = () => {
            checkModal(`В команде ошибка<br>Попробуйте ещё раз`);
            document.querySelector('.modal-test button').addEventListener('click', () => {
                setTimeout(() => checkCorrect(), 200);
            });
        }
    }

    function checkCorrect() {
        addComponent(data, progress);
        btn[1].style.border = '3px solid blue';
        btn[1].onclick = () => {
            (progress != data.practice.length) ? checkModal(`Команда написана верно!`) : checkModal(`Вы успешно выполнили все задания!`);

            document.querySelector('.modal-test button').addEventListener('click', () => {
                progress++;

                if (progress-1 != data.practice.length) {
                    checkProgress();
                    checkEmpty();
                    btn[1].style.border = 'none';
                    btnUnit.style.border = '3px solid blue';
                } else {
                    document.querySelector('.task-repeat-btn').style.border = '3px solid blue';
                    document.querySelector('.task-repeat-btn').addEventListener('click', () => {
                        progress = 1;
                        checkProgress();
                        checkEmpty();
                    });
                }
            });
        }
    }
    
    function checkTitle() {
        if (document.title !== `Тренажёр ${data.title}`) {
            console.log('Error in title');
        }
    }

    function checkProgress() {
        if (document.querySelector('.practice-drag>span').textContent != `${progress} / ${data.practice.length}`) {
            console.log('Error in progress');
        }
    }

    function checkEmpty() {
        document.querySelectorAll('.drag-wrap span').forEach(el => {
            if (el.innerHTML != ``) {
                console.log('Error in clear practice');
            }
        });
    }

    function checkModal(text) {
        if (document.querySelector('.modal-test p').innerHTML != text) {
            console.log('Error in modal');
        }
        document.querySelector('.modal-test button').style.border = '3px solid blue';
    }
}

function addComponent(data, progress) {
    const boxWrap = document.querySelectorAll('.drag-wrap span');
    for (let i = 0; i < boxWrap.length; i++) {
        boxWrap[i].innerHTML = `<b draggable="false">${data.practice[progress-1].correct[i]}</b>`;
    }
}

function createBtn() {
    const checkBtn = document.createElement('div');
    checkBtn.innerHTML = `
    <button class="btn-primary check-btn-unit">Check test</button>`
    document.body.append(checkBtn);
}

export {unitPractice};