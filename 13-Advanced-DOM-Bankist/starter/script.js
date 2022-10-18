'use strict';
// rgb(255, 255, 255);
///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Smooth Scroller implementation

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current Scroll (X/Y): ', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport: ',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // scrolling

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// Page Navigation

// Option 1. Works but inefficient
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Option 2. Best practice. Matching Strategy

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: `smooth` });
  }
});
// Lectures

// To select elements

console.log(document.documentElement);
console.log(document.documentElement.head);
console.log(document.documentElement.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');

console.log(header);
console.log(allSections);

const elementsByID = document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
const elementsByClassName = document.getElementsByClassName('btn');
console.log(allButtons);
console.log(elementsByID);
console.log(elementsByClassName);

// Creating and inserting elements in addition to .insertAdjacentHTML
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn ntn--close--cookie">Got it!</button>';

// header.prepend(message); // In top. First child
header.append(message); // at bottom.
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// Delete elements
document
  .querySelector('.ntn--close--cookie')
  .addEventListener('click', function () {
    // message.remove(); // same as below which has been more commonly used thus far
    message.parentElement.removeChild(message);
  });

// Style

message.style.backgroundColor = '#37383d';
message.style.width = '120%';
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered'); // Allows us to access CSS properties typically set at the top of the CSS file. Sort of like variables elsewhere. Set once and use all over css so we need to change it only once.

// Attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src); // gets absolute
console.log(logo.getAttribute('src')); // gets relative or whatever is in the html
console.log(logo.className);

logo.alt = 'Beautiful Minimalist Logo';

// Non-standard attributes
console.log(logo.designer); //Will not work because its not expected to be in a standard img tag but can be accessed via
console.log(logo.getAttribute('designer'));
logo.setAttribute('company', 'Bankist');

const h1 = document.querySelector('h1');
const alertH1 = function (e) {
  alert('addEventListener: Great! You are reading the heading :D');
};
h1.addEventListener('mouseenter', alertH1);

setTimeout(() => {
  h1.removeEventListener('mouseenter', alertH1);
}, 3000);

// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading ;D');
// };

// Event Propogation in practice

// rgb(255,255,255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Link', e.target);
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Container', e.target);
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log('Nav', e.target);
// });
