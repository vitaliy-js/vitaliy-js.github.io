const modal = content => {
    const overlay = document.createElement('div');
    document.body.appendChild(overlay);
    overlay.classList.add('overlay');

    document.querySelector('.overlay').style.animation = 'fadeIn ease-out 0.4s forwards';
	document.body.style.overflowY = 'hidden';

    overlay.innerHTML = `<div class="modal"></div>`;
    content();

    document.querySelector('.modal').onclick = e => e.stopPropagation();
    document.querySelector('.modal .btn-primary').onclick = () => closeOverlay();

    setTimeout(() => document.body.onclick = () => closeOverlay(overlay), 200);

    document.body.addEventListener('keydown', e => {
		if (e.key === 'Escape') {
            closeOverlay();
        }
	});
}

function closeOverlay(overlay = document.querySelector('.overlay')) {
    if (overlay) {
        overlay.style.animation = 'fadeOut ease-out 0.4s forwards';
        document.body.style.overflowY = 'auto';
        setTimeout(() => overlay.remove(), 400);
    }
}

export {modal, closeOverlay};