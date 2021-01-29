// Elements
const $container = document.getElementById('container');
const $timer = document.getElementById("timer");
const $counterNumber = document.getElementById("counter-number");
const $clicker = document.getElementById("clicker");
const $message = document.getElementById("message");
const $timerScore = document.getElementById('timer-score');
const $reloadButton = document.getElementById("reload");
const $startButton = document.getElementById("start");

// Game Rules
const maxTime = 5;
const winScore = 10;

// Timers
let clicks;
let timerNumber;
let timeInterval;

// Functions
const init = (e) => {
    const fromButtonId = e.target.id;
    clicks = 0;
    timerNumber = maxTime;
    $timer.innerHTML = timerNumber;
    $counterNumber.innerHTML = clicks;
    $message.classList.remove('message--failed');
    $message.classList.remove('message--success');

    if (fromButtonId === 'start') {
        timeInterval = setInterval(countDownTime, 1000);
        $container.classList.add('started');
    }
}
const countDownTime = () => {
    timerNumber--;
    $timer.innerHTML = timerNumber;
    checkGameState();
}
const countUpClicks = () => {
    if ($container.classList.contains('started')) {
        clicks++;
        $counterNumber.innerHTML = clicks;
        checkGameState();
    } else {
        alert('You must start the game first!')
    }

}
const checkGameState = () => {
    // Loss
    if(timerNumber === 0) {
        stopGame();
        if (clicks < winScore) {
            $message.classList.add('message--failed');
        }
    }

    // Clicks
    if (clicks >= winScore) {
        stopGame();
        $message.classList.add('message--success');
        $timerScore.innerHTML = `Your time: ${(maxTime - timerNumber)} seconds.`;
    }
}
const stopGame = () => {
    clearInterval(timeInterval);
    $container.classList.remove('started');
}

// Listener
$clicker.addEventListener("click", countUpClicks);
$reloadButton.addEventListener("click", init);
$startButton.addEventListener("click", init);
