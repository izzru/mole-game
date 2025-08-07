const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('#score');
const startButton = document.querySelector('#startButton');

let score = 0;
let lastHole;
let timeUp = false;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(500, 1500);
    const hole = randomHole(holes);
    hole.classList.add('mole');
    setTimeout(() => {
        hole.classList.remove('mole');
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    scoreBoard.textContent = 0;
    score = 0;
    timeUp = false;
    peep();
    setTimeout(() => timeUp = true, 10000);
}

function bonk(e) {
    if (!e.isTrusted) return; // cheater!
    score++;
    this.classList.remove('mole');
    scoreBoard.textContent = score;
}

holes.forEach(hole => hole.addEventListener('click', bonk));

startButton.addEventListener('click', startGame);
