const dragDrop = () => {
    const box = document.querySelectorAll('.drag-wrap span');
    const dragBox = document.querySelectorAll('.drag-panel b');

    if (window.innerWidth < 993) {
        touchDrop(box, dragBox);
        return;
    }

    //Make draggable, highlight area
    box.forEach(el => {
        el.ondragover = e => e.preventDefault()
        el.addEventListener('dragenter', () => {
            if (!el.classList.contains('drag-filled')) {
                el.classList.add('dragging');
            }
        });
        el.addEventListener('dragleave', () => el.classList.remove('dragging'));
        el.addEventListener('drop', () => el.classList.remove('dragging'));
    });

    //Store id of draggable card
    dragBox.forEach(el => {
        el.ondragstart = e => e.dataTransfer.setData('id', e.target.id);
    });

    box.forEach(el => {
        el.ondrop = e => {
            if (!el.classList.contains('drag-filled')) {
                const exampleId = e.dataTransfer.getData('id');
                const card = document.getElementById(exampleId);
                e.target.appendChild(card);
                e.target.classList.add('drag-filled');
                e.target.firstChild.draggable = false;
            }
        }
    });
}

function touchDrop(box, dragBox) {
    box.forEach(el => el.classList.add('empty-touch'));
    document.querySelectorAll('.empty-touch:not(.dragging)').forEach(el => el.onclick = showErr);

    dragBox.forEach(el => {
        el.onclick = () => {
            if (document.querySelector('.drag-panel-checked')) {
                document.querySelector('.drag-panel-checked').classList.remove('drag-panel-checked');
            }
            el.classList.add('drag-panel-checked');

            document.querySelectorAll('.empty-touch').forEach(boxAnswer => {
                boxAnswer.classList.add('dragging');
                boxAnswer.onclick = () => {
                    if (boxAnswer.classList.contains('dragging')) {
                        boxAnswer.innerHTML = `<b>${el.textContent}</b>`;
                        boxAnswer.classList.remove('empty-touch');
                        box.forEach(el => el.classList.remove('dragging'));
                        el.remove();
                    } else if (boxAnswer.classList.contains('empty-touch')) {
                        showErr();
                    }
                }
            });              
        }
    });

    function showErr() {
        const panel = document.querySelector('.drag-panel');
        panel.classList.add('drag-panel-empty');
        panel.addEventListener('click', () => panel.classList.remove('drag-panel-empty'));
    }
}

export {dragDrop};