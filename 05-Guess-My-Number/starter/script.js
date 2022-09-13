'use strict';

/*console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent = 'Correct Number, Dude!!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
// document.querySelector('.number').textContent = 13;*/

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

// Use function commented below below to refactor all the fuggly code below to make it more readable

// function displayClassText(cssClass, cssTextReqd) {
//   console.log((document.querySelector(cssClass).textContent = cssTextReqd));
// }
// displayClassText('.between', 'Login Here..');

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess);

  if (!guess) {
    document.querySelector('.message').textContent =
      '🤷🏼‍♂️ You didnt enter a number! [Please guess a number between 1 and 20]';
  } else if (guess < 1 || guess > 20) {
    document.querySelector('.message').textContent =
      '😡 Exactly what part of between 1 and 20 didnt you understand?!';
  } else if (guess === secretNumber) {
    document.querySelector('.message').textContent =
      '👏🏼👍 Woohoo!! Good job. Correct Number!';
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    } else {
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (guess !== secretNumber) {
    if (score > 1) {
      document.querySelector('.message').textContent =
        guess > secretNumber
          ? '🤔 Hmmm... Too High! Try again...'
          : '🤔 Hmmm... Too Low! Try again...';
      score -= 1;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '💥 You lost the game!!';
      document.querySelector('.score').textContent = 0;
    }
  } else {
    document.querySelector('.message').textContent = '...';
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('.message').textContent = 'Start Guessing...';
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
