// Remember, we're gonna use strict mode in all scripts now!
"use strict";

const x = 23;
console.log(`how the hell are you`);

// Coding Challenge #1

const forecastTemps = [12, 5, -5, 0, 4];

function printForecast(arr) {
  const ptemps = [];
  for (let index = 0; index < arr.length; index++) {
    const element = Number([index]);
    const elementvalue = arr[index];
    ptemps.push(`${elementvalue} degree centigrade in ${element + 1} days...`);
  }
  return ptemps.join(" ");
}

console.log(printForecast(forecastTemps));
