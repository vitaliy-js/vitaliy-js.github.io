const createModal = () => {
    document.body.insertAdjacentHTML('beforeend', `
    <div class="overlay">
        <div class="modal">
            <button class="btn-primary modal-btn">OK</button>
        </div>
    </div>`);
    const overlay = document.querySelector('.overlay');
    overlay.style.animation = 'fadeIn ease-out 0.4s forwards';
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
	document.body.style.overflowY = 'hidden';
    document.body.style.width = `calc(100vw - ${scrollbar}px)`;
    document.querySelector('.modal').addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    //Close overlay
    document.querySelector('.modal-btn').addEventListener('click', () => {
        closeOverlay();
    });
    overlay.addEventListener('animationend', () => {
        document.body.addEventListener('click', () => closeOverlay(overlay));
    });
    document.body.addEventListener('keydown', e => {
		if (e.key === 'Escape') {
            closeOverlay();
        }
	});
}

function closeOverlay(overlay = document.querySelector('.overlay')) {
    if (overlay) {
        overlay.style.animation = 'fadeOut ease-out 0.4s forwards';
        overlay.addEventListener('animationend', () => {
            overlay.remove();
            document.body.style.overflowY = 'auto';
        });
    }
}

function resultModal(result, type) {
    createModal();
    const modal = document.querySelector('.modal');
    const btn = document.querySelector('.modal button');
    let text;

    if (result >= 100) {
        text = 'Поздравляем!!!';
        modal.classList.add('modal-baloon');
    } else if (result >= 80) {
        text = `Вы успешно прошли ${type}`;
    } else {
        text = `Вы можете пройти ${type} ещё раз`;
    }

    modal.classList.add('modal-test');
    modal.insertAdjacentHTML('afterbegin', `
    <p>${text}<br>Ваш результат: <b>${result}%</b></p>`);
}

export {createModal, closeOverlay, resultModal};