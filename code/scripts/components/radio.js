export const radio = (list) => {
    Array.from(list.children).forEach((el, index, arr) => {
        el.addEventListener('click', () => {
            arr.forEach(el => el.className = '');
            el.className = 'radio-checked';
        });
    });
}