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
