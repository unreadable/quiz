// input
const numbers = [6, 5, 2, 6, 6, 2, 1, 7, 3, 3, 3];
const n = 11;
const k = 3;

// solution
// store the frequency for each score in an object
const counter = numbers.reduce((state, number) => {
    if (number in state) state[number]++;
    else state[number] = 1;

    return state;
}, {});

const topEntries = Object
    .keys(counter)
    .sort((prev, next) => counter[next] - counter[prev])
    .slice(0, k);

// output
console.log(topEntries)
