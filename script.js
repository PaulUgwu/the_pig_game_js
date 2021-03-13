var scores, roundScore, activePlayer;

newGame()

function newGame() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score--0').textContent = 0;
    document.getElementById('score--1').textContent = 0;
    document.getElementById('current--0').textContent = 0;
    document.getElementById('current--1').textContent = 0;

    document.querySelector('#name--0').textContent = 'PLAYER 1';
    document.querySelector('#name--1').textContent = 'PLAYER 2';

    document.querySelector('.btn--roll').style.display = 'block';
    document.querySelector('.btn--hold').style.display = 'block';

    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    
    document.querySelector('.player--0').classList.add('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
}

document.querySelector('.btn--roll').addEventListener('click', function () {

    // 1.Random number
    var dice = Math.floor(Math.random() * 6) + 1;

    // 2.dispaly the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // 3.update the round score only if the rolled number is not a 0ne
    if (dice > 1) {
        roundScore += dice;
        document.querySelector('#current--' + activePlayer).textContent = roundScore;
    } else {
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

        document.getElementById('current--0').textContent = 0;
        document.getElementById('current--1').textContent = 0;

        document.querySelector('.player--0').classList.toggle('player--active');
        document.querySelector('.player--1').classList.toggle('player--active');

        diceDOM.style.display = 'none';



    }

})

document.querySelector('.btn--hold').addEventListener('click', function () {
    // add current score to global score
    scores[activePlayer] += roundScore

    // update the ui
    document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];

    // check if player won the game
    if (scores[activePlayer] >= 10) {
        document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player--' + activePlayer).classList.add('player--winner');
        document.querySelector('.btn--roll').style.display = 'none';
        document.querySelector('.btn--hold').style.display = 'none';
    } else {
        // next player
        nextPlayer();
    }

});

function nextPlayer() {
    // next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current--0').textContent = 0;
    document.getElementById('current--1').textContent = 0;

    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');

    diceDOM.style.display = 'none';
}

document.querySelector('.btn--new').addEventListener('click', newGame);