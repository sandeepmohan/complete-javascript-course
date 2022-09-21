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

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
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
