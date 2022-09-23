'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type} </div>
          <div class="movements__value">${mov} €</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// displayMovements(account1.movements);

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${account.balance} €`;
};

// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;
  const expenses = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(expenses)} €`;
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => mov * (account.interestRate / 100))
    .filter(mov => mov >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest} €`;
};

// calcDisplaySummary(account1.movements);

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserNames(accounts);

const updateUI = function (account) {
  //Display Movements
  displayMovements(account.movements);
  // Display Balance
  calcDisplayBalance(account);
  // Display Summary
  calcDisplaySummary(account);
};

// Event handler for login
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear Input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
  }
  updateUI(currentAccount);
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }

  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    //Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});
//manage state for sort button
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted; //set state for sort button
});
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// const arrevens = [];
// const arrodds = [];
// const arrTest = [160, 3, 1719, 19, 11, 13, -21];
// for (const arrt of arrTest) {
//   arrt % 2 === 0 ? arrevens.push(arrt) : arrodds.push(arrt);
// }
// if (arrevens.length === 1) {
//   console.log(arrevens[0]);
// } else {
//   console.log(arrodds[0]);
// }
// // console.log(arrevens.length, arrodds.length);
// Simple Array methods
// slice
// let arraysamp = ['a', 'b', 'c', 'd', 'e'];
// console.log(arraysamp.slice(2));
// console.log(arraysamp.slice(2, 4));
// console.log(arraysamp.slice(-2));
// console.log(arraysamp.slice(1, -2));
// console.log(arraysamp.slice());

// // splice
// // arraysamp.splice(-1);
// console.log(arraysamp);

// // reverse
// let arraysamp2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arraysamp2.reverse());

// // concat
// const letters = arraysamp.concat(arraysamp2);
// console.log(letters);
// console.log(...arraysamp, ...arraysamp2);

// // join
// console.log(letters.join('-'));

// // forEach

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// movements.forEach(function (movement, i, arr) {
//   movement > 0
//     ? console.log(`Movement ${i + 1}: You deposited ${movement}`)
//     : console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
// });

// // forEach on Maps and Sets

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// // Map

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// // Set

// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);

// currenciesUnique.forEach(function (value, key) {
//   console.log(`${key}: ${value}`);
// });

// // Coding Challenge #1 - Dog or Puppy

// const isPuppy = function (juliaarr, katearr) {
//   const juliaarrdogsonly = juliaarr.slice(1, -2);
//   const finaldogarray = juliaarrdogsonly.concat(katearr);
//   finaldogarray.forEach(function (doggie, i, map) {
//     console.log(
//       `Dog number ${i + 1} is ${
//         doggie >= 3 ? 'an adult 🐕' : 'still a puppy 🐶'
//       } and is ${doggie} years old.`
//     );
//   });
// };

// const juliatd1 = [3, 5, 2, 12, 7];
// const katetd1 = [4, 1, 15, 8, 3];
// const juliatd2 = [9, 16, 6, 8, 3];
// const katetd2 = [10, 5, 6, 1, 4];

// console.log(`------Test Data 1------`);
// isPuppy(juliatd1, katetd1);
// console.log(`------Test Data 2------`);
// isPuppy(juliatd2, katetd2);

// // console.log(movements);

// const eurToUSD = 1.1;
// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUSD;
// });
// const movementsUSDarrow = movements.map(mov => mov * eurToUSD);
// console.log(movementsUSD);
// console.log(movementsUSDarrow);

// const movementDescriptions = movements.map((mov, i) =>
//   mov > 0
//     ? `Movement ${i + 1}: You deposited ${mov}`
//     : `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`
// );
// console.log(movementDescriptions);
// const deposits = movements.filter(mov => mov > 0);
// const withdrawals = movements.filter(mov => mov < 0);
// console.log(deposits);
// console.log(withdrawals);
// const balance = movements.reduce((acc, mov) => acc + mov);
// console.log(balance);

// // coding challenge #2

// const agetestd1 = [5, 2, 4, 1, 15, 8, 3];
// const agetestd2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAverageHumanAge = function (agearr) {
//   const ageInHuman = agearr.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
//   const adultDogs = ageInHuman.filter(age => age >= 18);
//   const averageAge =
//     // adultDogs.reduce((acc, age) => acc + age, 0) / adultDogs.length;
//     adultDogs.reduce((acc, age, i, arr) => acc + age / arr.length, 0);
//   return averageAge;
// };
// console.log(calcAverageHumanAge(agetestd1));
// console.log(calcAverageHumanAge(agetestd2));

// // pipeline
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUSD)
//   .reduce((acc, mov) => acc + mov, 0);
// const totalWithdrawalsUSD = movements
//   .filter(mov => mov < 0)
//   .map(mov => mov * eurToUSD)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositsUSD);
// console.log(totalWithdrawalsUSD);

// const calcAverageHumanAgeChained = agearr =>
//   agearr
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

// console.log(calcAverageHumanAgeChained([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAgeChained([16, 6, 10, 5, 6, 1, 4]));
const aarr = [1, 2, 2, 2, 3];
const barr = [2];
// console.log(aarr.filter(n => !barr.includes(n)));
const testarray = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
// const subtestarray = testarray.reduce((acc, val) => acc + val, 0);
// console.log(subtestarray);

// let max_till_now = 0;
let max_ending = 0;
let finSubArray = [];
// for (let i = 0; i < testarray.length; i++) {
//   max_ending = max_ending + testarray[i];
//   if (max_ending < 0) max_ending = 0;
//   if (max_till_now < max_ending) max_till_now = max_ending;
// }
// console.log(max_till_now);

// const finArr = testarray.reduce((max_ending, val, i, arr) => {
//   let max_till_now = 0;
//   max_ending += arr[i];
//   max_ending < 0 ? (max_ending = 0) : finSubArray.push[val];
//   console.log(max_ending, val);
//   max_till_now < max_ending ? (max_till_now = max_ending) : 0;
//   return max_till_now;
// });
// console.log(max_till_now, finSubArray);
// const arrPairs = [
//   [10, 0],
//   [3, 5],
//   [5, 8],
// ];
// const finalArrSum = arrPairs.reduce((acc, arr) => acc + arr[0] - arr[1], 0);
// console.log(finalArrSum);

// Sorting in JS is wierd
// Strings
const owners = ['Sandeep', 'Elizabeth', 'Anjali', 'Uma'];
console.log(owners.sort());
console.log(owners); //sort mutates original array

// Numbers
console.log(movements);

// Ascending. JS treats numbers like Strings so call back condition specified what needs to happen. a represents current iterating value in array and b is the very next value
// movements.sort((a, b) => {
//   if (a > b) {
//     return 1;
//   } else if (a < b) {
//     return -1;
//   }
// });

movements.sort((a, b) => a - b);

console.log(movements);

// Descending

// movements.sort((a, b) => {
//   if (a < b) {
//     return 1;
//   } else if (a > b) {
//     return -1;
//   }
// });

movements.sort((a, b) => b - a);

console.log(movements);

const z = Array.from(
  { length: 100 },
  (cur, _) => (cur = Math.round(Math.random() * 5 + 1))
);
console.log(z);

// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value')
//   );
//   console.log(movementsUI.map(el => Number(el.textContent.replace('€', ''))));
// });

labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')].map(
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI2);
});

function getCount(str) {
  return [...str].filter(strel => strel.match(/a|e|i|o|u/gi)).length;
}
console.log(getCount('Elizabeth'));

// Ex 1
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(val => val > 0)
  .reduce((sum, curr) => sum + curr, 0);
console.log(bankDepositSum);

// Ex 2
// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 1000).length;

const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur >= 100 ? ++count : count), 0);

console.log(numDeposits1000);

// note the prefixed increment operator.

let a = 10;
console.log(a++);
console.log(a); // its in the very next run of the variable that the increment shows up if we write ++ after the variable. fix for this is to put the increment as a prefix rather than a suffix
let b = 10;
console.log(++b);

// 3

// const sums = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (sums, cur) => {
//       // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
//       sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur; // cleaner
//       return sums;
//     },
//     { deposits: 0, withdrawals: 0 }
//   );

// console.log(sums);

// above deconstructed

const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur; // cleaner
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits, withdrawals);

// 4.
// this is a nice title -> This Is a Nice Title

const convertTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = [
    'a',
    'as',
    'an',
    'and',
    'the',
    'but',
    'for',
    'or',
    'of',
    'off',
    'per',
    'to',
    'up',
    'via',
    'if',
    'is',
    'nor',
    'or',
    'so',
    'yet',
    'the',
    'on',
    'in',
    'with',
  ];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');

  return capitalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

// Coding Challenge #4

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1
dogs.forEach(
  dog => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
);
console.log(dogs);

// 2
const dogSarah = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(dogSarah);
console.log(
  `Sarah's dog is eating ${
    dogSarah.curFood > dogSarah.recommendedFood ? 'more' : 'less'
  } than the recommended portion`
);

// 3
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);
console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);

// 4
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);
console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too little!`);

// 5
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// 6
// current > (recommended * 0.90) && current < (recommended * 1.10)
const checkEatingOkay = dog =>
  dog.curFood > dog.recommendedFood * 0.9 &&
  dog.curFood < dog.recommendedFood * 1.1;
console.log(dogs.some(checkEatingOkay));

// 7

console.log(dogs.filter(checkEatingOkay));

// 8
const dogsSorted = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(dogsSorted);
