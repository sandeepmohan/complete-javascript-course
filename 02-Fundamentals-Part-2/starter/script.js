'use strict';
// Function Declaration

function logger(name) {
    const nameLog = `Hi my name is ${name}!`;
    return nameLog;
};

const myName1 = logger('Elizabeth');

// Function Expression

const nameLog2 = function (name) {
    return `Hi my name is ${name}!`;
};

const myName2 = nameLog2('Elizabeth');

// Arrow Functions

const nameLog3 = (myname, bYear) => `Hi, My name is ${myname} and I am ${2022 - bYear} years old!`;

const myName3 = nameLog3('Elizabeth', 1972);

console.log(myName1, myName2, myName3);

// coding challenge 1

const teamAverage = (score1, score2, score3) => (score1 + score2 + score3) / 3;
// const avgKoalas = teamAverage(65, 54, 49);
// const avgDolphins = teamAverage(44, 23, 71);

const checkWinner = function ([kscore1, kscore2, kscore3], [dscore1, dscore2, dscore3]) {
    const avgKoalas = teamAverage(kscore1, kscore2, kscore3);
    const avgDolphins = teamAverage(dscore1, dscore2, dscore3);
    if ((avgKoalas >= (avgDolphins * 2))) {
        return `Koalas Win (${avgKoalas} vs. ${avgDolphins})`;
    } else if ((avgDolphins >= (avgKoalas * 2))) {
        return `Dolphins Win (${avgDolphins} vs. ${avgKoalas})`;
    } else if (avgDolphins === avgKoalas) {
        return `Dolphins and Koalas Draw (${avgDolphins} vs. ${avgKoalas})`;
    } else {
        return `No Team Wins (Koalas got a ${avgKoalas} point average and Dolphins got a ${avgDolphins} point average. Neither is double of the other nor are equal for a draw!!)`
    };
};

const tD1 = checkWinner([65, 54, 49], [44, 23, 71]);
const tD2 = checkWinner([23, 34, 27], [85, 54, 71]);
console.log(`
${tD1}
${tD2}
`);


// Arrays


const friends = ['Bill', 'Rajiv', 'Rads'];
console.log(friends[friends.length - 1]);
const someString = 'Sandeep,loveshiskutties';
const stringArray = [someString.split('')];
console.log(stringArray);
// const numRangeArray = [new Range(1, 25, 2)];
// console.log(numRangeArray);


// Coding Challenge 2

function calcTip(billValue) {
    const tip = (billValue >= 50 && billValue <= 300) ? billValue * 0.15 : billValue * 0.2;
    return tip;
};
// console.log(calcTip(20));

const bills = [125, 555, 44];
const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
const total = [bills[0] + tips[0], bills[1] + tips[1], bills[2] + tips[2]];
console.log(total);
console.log(bills, tips, total);

// Challenge

const sandeep = {
    birthYear: 1972,
    firstName: 'Sandeep',
    lastName: 'Mohan',
    hasDriversLicense: true,
    friends: ['Rajiv', 'Rads', 'Bill'],
    job: 'Solutions Architect',
    location: 'Randolph, NJ',
    email: 'sjmohan@gmail.com',
    calcAge: function () {
        this.age = 2022 - this.birthYear;
        return this.age;
    },
    getSummary: function () {
        this.summary = `${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he ${this.hasDriversLicense ? 'has a' : 'does not have a'} driver's license in ${this.location}. He can be contacted at ${this.email}.`;
        return this.summary;
    }
};
console.log(sandeep.getSummary());
// console.log(sandeep.calcAge())
console.log(sandeep.age);
console.log(`${sandeep.firstName} has ${sandeep.friends.length} friends, and his best friend is ${sandeep.friends[0]}.`);

// Coding Challenge 3

const mark = {
    fullName: 'Mark Miller',
    mass: 78,
    height: 1.69,
    calcBMI: function () {
        this.currentBMI = this.mass / (this.height ** 2);
        return this.currentBMI;
    }
};
const john = {
    fullName: 'John Smith',
    mass: 92,
    height: 1.95,
    calcBMI: function () {
        this.currentBMI = this.mass / (this.height ** 2);
        return this.currentBMI;
    }
};

const johnBMI = john.calcBMI();
const markBMI = mark.calcBMI();
console.log(johnBMI, markBMI);
console.log(mark, john);
console.log(`${john.fullName.split(' ')[0]}'s BMI (${john.currentBMI}) ${john.currentBMI > mark.currentBMI ? 'is higher than' : 'is lower than'} ${mark.fullName.split(' ')[0]}'s BMI (${mark.currentBMI})`);

// for loop keeps running while condition is TRUE
for (let rep = 1; rep <= 10; rep++) {
    console.log(` Lifting weights repetition ${rep}`);
};