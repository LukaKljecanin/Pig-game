'use strict';
// SELEZIONIAMO ELEMENTI
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// CONDIZIONE DI PARTENZA
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let activePlayer = 0;
let currentScore = 0;
let playing = true;

// CREO UNA FUNZIONE CON LA QUALE PASSO AL SECONDO GIOCATORE
const switchToNextPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  // FACENDO IN QUESTO MODO CAMBIO IL COLORE AL GIOCATORE CHE STA GIOCANDO ORA.
};

// FUNZIONE ROLL
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.generare un numero randomo
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // 2.display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3.Controllo numero 1 : se TRUE, passare al secondo giocatore

    if (dice !== 1) {
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // IN QUESTO MODO HO AGGIUNTO IL PUNTEGGIO AL GIOCATORE CORRENTE .
    } else {
      switchToNextPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. aggiungere il punteggio al giocattore attivo
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      //2.Controllare se il giocatore attivo ha il punteggio >=100... il gioco e finito.
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
      playing = false;
      diceEl.classList.add('hidden');
    } else {
      switchToNextPlayer();
    }
    //3. passare al giocatore succesivo
  }
});

btnNew.addEventListener('click', function () {
  location.reload();
});
