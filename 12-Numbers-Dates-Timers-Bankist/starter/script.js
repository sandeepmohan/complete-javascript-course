'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-07-26T17:01:17.194Z',
    '2020-07-28T23:36:17.929Z',
    '2020-08-01T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };

  // Set time to 5 minutes
  let time = 120;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };
    // const locale = navigator.language;
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
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
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
console.log(23 === 23.0);
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3); // returns false because of JS/Ruby/PHP using binary representation of numbers. Makes it hard to work with fraction

console.log(Number('23'));
console.log(+'23');

console.log(Number.parseInt('30px', 10));

// const pinArr = [
//   [1, 2, 4],
//   [3, 2, 6],
//   [5, 4, 6, 2, 8],
//   [7, 4, 8],
// ];

// const pincArr1 = [1, 2, 4];
// const pinacrr2 = [3, 2, 6];
// const pincArr3 = [5, 4, 6, 2, 8];
// const pincArr4 = [7, 4, 8];

// const possiblecombos = ([array1, array2, array3, array4]) => {
//   const pinSequence = [];
//   for (let a = 0; a < array1.length; a++) {
//     for (let b = 0; b < array2.length; b++) {
//       for (let c = 0; c < array3.length; c++) {
//         for (let d = 0; d < array4.length; d++) {
//           pinSequence.push(
//             [array1[a]].concat(array2[b]).concat(array3[c]).concat(array4[d])
//           );
//         }
//       }
//     }
//   }
//   return pinSequence.map((arr, i) => arr.join(''));
// };

// console.log(possiblecombos([pincArr1, pinacrr2, pincArr3, pincArr4]));
// // const arr1 = [1, 2, 3];
// // const arr2 = [4, 5];

// // const cartesianProduct = (arr1, arr2) => {
// //   const res = [];
// //   for (let i = 0; i < arr1.length; i++) {
// //     for (let j = 0; j < arr2.length; j++) {
// //       res.push([arr1[i]].concat(arr2[j]));
// //     }
// //   }
// //   return res;
// // };
// // console.log(cartesianProduct(arr1, arr2));

// // let observed = '369';
// // let observedRules = observed.split('').map(val => {
// //   let numval = Number(val);
// //   switch (numval) {
// //     case 0:
// //       numval = [0, 8];
// //       break;
// //     case 1:
// //       numval = [1, 2, 4];
// //       break;
// //     case 2:
// //       numval = [2, 3, 1, 5];
// //       break;
// //     case 3:
// //       numval = [3, 2, 6];
// //       break;
// //     case 4:
// //       numval = [4, 1, 7, 5];
// //       break;
// //     case 5:
// //       numval = [5, 2, 4, 6, 8];
// //       break;
// //     case 6:
// //       numval = [6, 9, 5, 3];
// //       break;
// //     case 7:
// //       numval = [7, 8, 4];
// //       break;
// //     case 8:
// //       numval = [8, 7, 9, 0, 5];
// //       break;
// //     case 9:
// //       numval = [9, 8, 6];
// //       break;
// //   }
// //   return numval;
// // });
// // console.log(observedRules);

// // const combine = ([head, ...[headTail, ...tailTail]]) => {
// //   if (!headTail) return head;

// //   const combined = headTail.reduce((acc, x) => {
// //     return acc.concat(head.map(h => `${h}${x}`));
// //   }, []);

// //   return combine([combined, ...tailTail]);
// // };

// // console.log(combine(observedRules));

// // function getPins(observed) {
// //   let observedRules = observed.split('').map(val => {
// //     let numval = Number(val);
// //     switch (numval) {
// //       case 0:
// //         numval = [0, 8];
// //         break;
// //       case 1:
// //         numval = [1, 2, 4];
// //         break;
// //       case 2:
// //         numval = [2, 3, 1, 5];
// //         break;
// //       case 3:
// //         numval = [3, 2, 6];
// //         break;
// //       case 4:
// //         numval = [4, 1, 7, 5];
// //         break;
// //       case 5:
// //         numval = [5, 2, 4, 6, 8];
// //         break;
// //       case 6:
// //         numval = [6, 9, 5, 3];
// //         break;
// //       case 7:
// //         numval = [7, 8, 4];
// //         break;
// //       case 8:
// //         numval = [8, 7, 9, 0, 5];
// //         break;
// //       case 9:
// //         numval = [9, 8, 6];
// //         break;
// //     }
// //     return numval;
// //   });
// //   const combine = ([head, ...[headTail, ...tailTail]]) => {
// //     if (!headTail) return head;

// //     const combined = headTail.reduce((acc, x) => {
// //       return acc.concat(head.map(h => `${h}${x}`));
// //     }, []);

// //     return combine([combined, ...tailTail]);
// //   };
// //   let possPins = combine(observedRules);
// //   return possPins;
// // }
// // console.log(getPins('269'));

// function getPINs(observed) {
//   let observedRules = observed.split('').map(val => {
//     switch (val) {
//       case '0':
//         val = ['0', '8'];
//         break;
//       case '1':
//         val = ['1', '2', '4'];
//         break;
//       case '2':
//         val = ['2', '3', '1', '5'];
//         break;
//       case '3':
//         val = ['3', '2', '6'];
//         break;
//       case '4':
//         val = ['4', '1', '7', '5'];
//         break;
//       case '5':
//         val = ['5', '2', '4', '6', '8'];
//         break;
//       case '6':
//         val = ['6', '9', '5', '3'];
//         break;
//       case '7':
//         val = ['7', '8', '4'];
//         break;
//       case '8':
//         val = ['8', '7', '9', '0', '5'];
//         break;
//       case '9':
//         val = ['9', '8', '6'];
//         break;
//     }
//     return val;
//   });
//   const combine = ([head, ...[headTail, ...tailTail]]) => {
//     if (!headTail) return head;

//     const combined = headTail.reduce((acc, x) => {
//       return acc.concat(head.map(h => `${h}${x}`));
//     }, []);

//     return combine([combined, ...tailTail]);
//   };
//   let possPins = combine(observedRules);
//   return possPins;
// }
// console.log(getPINs('11'));
console.log(Number.MAX_SAFE_INTEGER); // 9,007,199,254,740,991
console.log(Number.MAX_SAFE_INTEGER); //    24,880,000,000,000 - US Economy

// Create a date

console.log(new Date());
console.log(new Date(1972, 6, 11));

// Time Span

// const calcDaysPassed = (date1, date2) =>
//   Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

// const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 24));
// console.log(days1);
