// ורד נגאר 325523017
// מוחמד ריאן 327640835

const arr = [0, 5, 2, 0, 3, 0, 7];

let count = 0;
let if0 = false;

arr.forEach((n) => {
  if0 = n === 0;
  count += if0;
});

console.log("Zeros:", count);
