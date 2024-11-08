const getRandom = arr => Math.floor(Math.random(arr) * arr.length);

function randomArr(data, count, arr) {
    let i = 0;
    while (i < count) {
        const val = getRandom(data);
        if (!arr.includes(val)) {
            arr.push(val);
            i++;
        }
    }
    return arr;
}

export {getRandom, randomArr};