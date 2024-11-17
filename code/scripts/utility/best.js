function setBest(type, id) {
    const text = document.querySelector('.header-result b');
    if (localStorage.getItem(type)) {
        const arr = localStorage.getItem(type).split(',');
        text.textContent = `${arr[id-1]}%`;
        if (arr[id-1] >= 100) {
            text.parentElement.classList.add('best-result');
        }
    }
}

function saveBest(type, id, result) {
    if (!localStorage.getItem(type)) {
        const number = (type === 'test') ? 31 : 18;
        const all = '0,'.repeat(number).slice(0,-1);
        localStorage.setItem(type, all);
    }

    const arr = localStorage.getItem(type).split(',');
    if (arr[id-1] < result) {
        arr[id-1] = result;
        localStorage.setItem(type, arr);
        setBest(type, id);
    }
}

export {setBest,saveBest};