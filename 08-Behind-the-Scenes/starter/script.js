'use strict';

// function calcAge(birthYear) {
//   const age = 2037 - birthYear;
//   function printAge() {
//     const output = `You are ${age}, born in ${birthYear}`;
//     console.log(output);
//   }
//   printAge();
//   return age;
// }

// const firstName = 'Jonas';
// calcAge(1972);

// use of this keyword

// console.log(this);

// const calcAge = function (birthYear) {
//   console.log(2037 - birthYear);
//   console.log(this);
// };
// calcAge(1972);

// const calcAgeArrow = birthYear => {
//   console.log(2037 - birthYear);
//   console.log(this);
// };
// calcAgeArrow(1972);

const sandeep = {
  firstName: 'Sandeep',
  year: 1972,
  calcAge: function () {
    console.log(2037 - this.year);

    const isGenX = function () {
      console.log(this.year >= 1969 && this.year <= 1980);
    };
    isGenX();
  },
};
sandeep.calcAge();
