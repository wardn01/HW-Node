// ורד נגאר 325523017
// מוחמד ריאן 327640835

for (let num = 2; num < 237; num++) {
  let isPrime = true;

  for (let i = 2; i < num && isPrime; i++)
     if (num % i === 0) isPrime = false;

  if (isPrime) 
   console.log(num);
}
