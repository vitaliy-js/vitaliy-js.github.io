const setStyle = () => {
    document.querySelector('.practice-wrap form').addEventListener('submit', e => {
        e.preventDefault();
        const input = document.querySelector('.practice-wrap input');
        const result = document.querySelector('.practice-example p');
        const resultErr = document.querySelector('.practice-error');

        //Validate data
        if (!input.value.includes('=') || input.value.includes('-')) {
            showErr();
            return;
        } 

        const prop = input.value.split('=')[1].trim();
        const getLast = (prop[prop.length-1].trim() === ';') ? prop.length-2 : prop.length-1;
        const quote = [prop[0].trim(), prop[getLast].trim()];
        if ((quote[0] != `'` && quote[0] != `"`)
            || (quote[1] != `'` && quote[1] != `"`)) {
            showErr();
            return;
        }
        
        let val = input
        .value.replace('=',':').replaceAll('"', '')
        .replaceAll('\'', '');

        //Replace upperCase to CSS-value
        const getUpper = val.replace(/[^A-Z]/g, '');
        if (getUpper.length > 0) {
            val = val.replaceAll(getUpper, `-${getUpper.toLowerCase()}`);
        }

        result.style = val;

        input.addEventListener('input', e => {
            resultErr.style.display = 'none';
            if (e.target.value.length === 0) {
                result.style = '';
            }
        });

        function showErr() {
            result.style = '';
            resultErr.style.display = 'block';
        }
    });
}

export {setStyle};