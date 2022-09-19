'use strict';

const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 100 * numPassengers
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};
createBooking('LH123');
createBooking('LH124', 2, 800);
createBooking('LH125', 2);
createBooking('LH126', 4);
createBooking('LH127', undefined, 300);

console.log(bookings);

// Higher order functions

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  const newWord = [first.toUpperCase(), ...others].join();
  console.log(newWord);
  return newWord;
};
/// This is the higher order function
const transformer = function (str, fn) {
  console.log(`Transformed string: ${fn(str)}`);
};
transformer('JavaScript is the best!', oneWord);
['Sandeep', 'Elizabeth', 'Monica', 'Anjali', 'Uma'].forEach(upperFirstWord);
transformer('Sandeep', oneWord);

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting}, ${name}`);
  };
};
const greeterHi = greet('Hi');
greeterHi('Sandeep');
greeterHi('Elizabeth');
greet('Hi')('Sandeep and Elizabeth');

const greet2 = greeting => {
  return name => {
    console.log(`${greeting}, ${name}`);
  };
};
greet2('Hello')('Sandeep');

// call and apply

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Sandeep Mohan');
lufthansa.book(634, 'Elizabeth Mohan');
console.log(lufthansa);

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

book.call(eurowings, 234, 'Anjali Mohan');
console.log(eurowings);

// bind

const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);

bookEW(12345, 'Sandeep Mohan');
bookLH(54321, 'MOHAN, Sandeep');

const bookLH123 = book.bind(lufthansa, 123);
bookLH123('Anjali Mohan');

// with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  this.planes++;
  console.log(this);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));
// partial application of add tax for VAT by setting rate
const addVAT = addTax.bind(null, 0.23);

console.log(addVAT(200));
console.log(addVAT(12345));

const pangram = 'The quick brown fox jumps over the lazy dog';
const panset = new Set(...[pangram.toLowerCase().replaceAll(' ', '').trim()]);
const pantarg = [...panset];
console.log(pantarg);
const teststr =
  'method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value. Stands to reason that if you call';
const testarr = [
  ...new Set(...[teststr.toLowerCase().replaceAll(' ', '').trim()]),
];
console.log(testarr);
let checker = (arr, target) => target.every(v => arr.includes(v));
console.log(checker(testarr, pantarg));

function isPangram(string) {
  const targetSample = 'The quick brown fox jumps over the lazy dog';
  const targetArray = [
    ...new Set(
      ...[
        targetSample.toLowerCase().replace(/\s/g, '').replace(/\n/g, '').trim(),
      ]
    ),
  ];
  const testArray = [
    ...new Set(
      ...[string.toLowerCase().replace(/\s/g, '').replace(/\n/g, '').trim()]
    ),
  ];
  const checker = (testArray, targetArray) =>
    targetArray.every(v => testArray.includes(v));
  const checked = checker(testArray, targetArray);
  return checked;
}
console.log(
  isPangram(
    'method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value. Stands to reason that if you call '
  )
);

// Coding Challenge #1

/* 
Let's build a simple poll app!

A poll has a question, an array of options from which people can choose, and an array with the number of replies for each option. This data is stored in the starter object below.

Here are your tasks:

1. Create a method called 'registerNewAnswer' on the 'poll' object. The method does 2 things:
  1.1. Display a prompt window for the user to input the number of the selected option. The prompt should look like this:
        What is your favourite programming language?
        0: JavaScript
        1: Python
        2: Rust
        3: C++
        (Write option number)
  
  1.2. Based on the input number, update the answers array. For example, if the option is 3, increase the value AT POSITION 3 of the array by 1. Make sure to check if the input is a number and if the number makes sense (e.g answer 52 wouldn't make sense, right?)
2. Call this method whenever the user clicks the "Answer poll" button.
3. Create a method 'displayResults' which displays the poll results. The method takes a string as an input (called 'type'), which can be either 'string' or 'array'. If type is 'array', simply display the results array as it is, using console.log(). This should be the default option. If type is 'string', display a string like "Poll results are 13, 2, 4, 1". 
4. Run the 'displayResults' method at the end of each 'registerNewAnswer' method call.

HINT: Use many of the tools you learned about in this and the last section 😉

BONUS: Use the 'displayResults' method to display the 2 arrays in the test data. Use both the 'array' and the 'string' option. Do NOT put the arrays in the poll object! So what shoud the this keyword look like in this situation?

BONUS TEST DATA 1: [5, 2, 3]
BONUS TEST DATA 2: [1, 5, 3, 9, 6, 1]

GOOD LUCK 😀
*/

const poll = {
  question: 'What is your favorite programming language?',
  options: ['0: Javascript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  registerNewAnswer(string) {
    const answer = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}(Write option number)`
      )
    );
    typeof answer === 'number' &&
      answer < this.answers.length &&
      this.answers[answer]++;
    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    }
  },
};
document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));
// poll.registerNewAnswer();
console.log(poll.answers);

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
