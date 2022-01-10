'use strict';

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const buttons = document.getElementsByClassName('btn');

let scores = [0, 0];
let current = 0;

let isGameActive = true;

let activePlayer = 0;

// initialize settings for new game
function init() {
    isGameActive = true;
    current0.textContent = 0;
    current1.textContent = 0;
    score0.textContent = 0;
    score1.textContent = 0;
    current = 0;
    scores = [0, 0];
    activePlayer = 0;
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
}

// switch classes
function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    current = 0;
    activePlayer = activePlayer == 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}

// rolling the dice
function rollDice() {
    const random = Math.floor(Math.random() * 6) + 1;
    dice.src = `dice-${random}.png`;
    if (random == 1) {
        switchPlayer();
    } else {
        current += random;
        document.getElementById(`current--${activePlayer}`).textContent = current;
    }
}

// hold my value
function holdValue() {
    scores[activePlayer] += current;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    if (scores[activePlayer] > 20) {
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        isGameActive = false;
    }
    switchPlayer();
}

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        if (buttons[i].classList.contains('btn--roll')) {
            if (isGameActive) {
                rollDice();
            }
        } else if (buttons[i].classList.contains('btn--hold')) {
            if (isGameActive) {
                holdValue();
            }
        } else {
            init();
        }
    });
}
