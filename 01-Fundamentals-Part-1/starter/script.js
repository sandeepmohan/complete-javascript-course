// // // let js = 'amazing';

// // // // console.log(40 + 8 + 23 - 10);
// // // console.log("Sandeep");
// // // console.log(23);

// // // let firstName = "Sandeep";
// // // console.log(firstName);
// // // // Declaring variables
// // // let country = 'United States of America';
// // // let continent = 'North America';
// // // let population = 350;
// // // // outputing to console
// // // console.log(country);
// // // console.log(continent);
// // // console.log(population);

// // let javascriptIsFun = true;
// // console.log(javascriptIsFun);

// // console.log(typeof javascriptIsFun);
// // console.log(typeof true);
// // console.log(typeof 23);
// // console.log(typeof 'javascriptIsFun');
// // // let is only required when first declaring a variable. After that the variable can be reassigned as below
// // javascriptIsFun = 'Yes!';
// // console.log(typeof javascriptIsFun)

// // // undefined datatype
// // let year;
// // console.log(year);
// // console.log(typeof year);

// // year = 1991;
// // console.log(year);
// // console.log(typeof year);

// // // bug in typeOf at language level that was never fixed and null datatype

// // console.log(typeof null);

// // let isIsland = false;
// // let language;
// // const country = 'United States of America';
// // const continent = 'North America';
// // let population = 350;
// // // outputing to console
// // console.log(typeof country);
// // console.log(typeof continent);
// // console.log(typeof population);
// // console.log(typeof isIsland);
// // console.log(typeof language);

// // language = 'English';

// // console.log(country);
// // console.log(continent);
// // console.log(population);
// // console.log(isIsland);
// // console.log(language);
// // //Below throws error to prove you cant mutate const variables
// // country = 'India';

// //Basic operators
// const now = 2022;
// const ageSandeep = now - 1972;
// const ageElizabeth = now - 1969;
// console.log(ageSandeep, ageElizabeth);

// console.log(ageSandeep * 2, ageSandeep / 10, ageSandeep ** 3, ageSandeep % 3);

// let x = 10 + 5;
// console.log(x);
// x += 10;
// console.log(x);
// x -= 10;
// console.log(x);
// x *= 10;
// console.log(x);
// x /= 10;
// console.log(x);
// x %= 3;
// console.log(x);

// const firstName = 'Sandeep';
// const lastName = 'Mohan';
// console.log(firstName + lastName);
// console.log(firstName + ' ' + lastName);

// const now = 2022;
// const ageSandeep = now - 1972;
// const ageElizabeth = now - 1969;

// console.log(now - 1972 > now - 1969);

// let x, y;
// x = y = 25 - 10 - 5;
// console.log(x, y)

// const averageAge = (ageElizabeth + ageSandeep) / 2;
// console.log(ageElizabeth, ageSandeep, averageAge);


// let isIsland = false;
// let language;
// const country = 'United States of America';
// const continent = 'North America';
// let population = 350;
// language = 'English';

// console.log(country, continent, population, isIsland, language);

// let halfPop = population / 2;
// population += 1;
// let compToFin = population > 6;
// let compToAvg = population > 33;
// let description = country + ' is in ' + continent + ', and its ' + population + ' million people speak ' + language;

// console.log(country, continent, population, halfPop, compToAvg, compToFin, isIsland, language);

// console.log(description)

// // Coding Challenge #1

let markBMItc1, johnBMItc1, markBMItc2, johnBMItc2, markHigherBMItc1, markHigherBMItc2;
markBMItc1 = 78 / (1.69 ** 2);
johnBMItc1 = 92 / (1.95 ** 2);
markBMItc2 = 95 / (1.88 ** 2);
johnBMItc2 = 85 / (1.76 ** 2);
markHigherBMItc1 = markBMItc1 > johnBMItc1;
markHigherBMItc2 = markBMItc2 > johnBMItc2;
console.log('Mark 1: ' + markBMItc1, 'John 1: ' + johnBMItc1, 'Mark 2: ' + markBMItc2, 'John 2: ' + johnBMItc2);
console.log('Test Case 1: ' + markHigherBMItc1, 'Test Case 2: ' + markHigherBMItc2)

const firstName = 'Sandeep';
const job = 'Solutions Architect';
const birthYear = 1972;
const year = 2022;

const sentence = `I'm ${firstName}, a ${year - birthYear} years old ${job}!`;

console.log(sentence);

if ((year - birthYear) <= 65) {
    console.log(`Dude, you are just ${year - birthYear}. Too young for retirement.`);
} else {
    console.log(`Yep better start getting ready for retirement!!`);
};

// Coding Challenge #2

if (markBMItc1 > johnBMItc1) {
    console.log(`Mark's BMI (${markBMItc1}) is higher than John's (${johnBMItc1})`);
} else {
    console.log(`Mark's BMI (${markBMItc1}) is lower than John's (${johnBMItc1})`);
};

// five falsy values: 0, '', undefined, null and NaN

const testAge = Number(prompt(`What's your favorite number?`));
console.log(typeof testAge);
console.log(testAge);
