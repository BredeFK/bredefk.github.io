let timeLeft;
let countdown;
let passButton = document.getElementById("passButton");
let description = document.getElementById("description");
let startButton = document.getElementById("startButton");
let restartButton = document.getElementById("restartButton");
let buzzerSound = document.getElementById("buzzer");
let tickingSound = document.getElementById("ticking");

buzzerSound.volume = 0.5;
tickingSound.loop = true;

function startGame() {
    description.classList.add("d-none");
    timeLeft = randomNumberBetween(15, 40);
    console.log("Game started! Timer set to: " + timeLeft + "s");

    startButton.classList.add("d-none");
    passButton.classList.remove("fade-out");
    passButton.classList.remove("d-none");
    restartButton.classList.add("d-none");

    passButton.classList.add("pulse-animation");
    tickingSound.currentTime = 0;
    tickingSound.play();

    updateTimer();
    countdown = setInterval(tick, 1000);
}

function updateTimer() {
    console.log("Time left: " + timeLeft + "s");
}

function tick() {
    if (timeLeft > 0) {
        timeLeft--;
        updateTimer();
    } else {
        clearInterval(countdown);
        tickingSound.pause();
        buzzerSound.play();

        passButton.classList.add("fade-out");
        setTimeout(() => {
            passButton.classList.add("d-none");
            passButton.classList.remove("pulse-animation");
            restartButton.classList.remove("d-none");
            description.innerText = `Click on Restart to try again`
            description.classList.remove("d-none");
        }, 500);
    }
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function passBomb() {
    if (timeLeft > 0) {
        let addedTime = randomNumberBetween(1, 5);
        timeLeft += addedTime;
        console.log(`${addedTime}s added to timer`);
        updateTimer();

        passButton.classList.add("btn-warning");
        setTimeout(() => passButton.classList.remove("btn-warning"), 200);
    }
}

passButton.addEventListener("click", passBomb);
passButton.addEventListener("mousedown", () => passButton.classList.add("btn-danger"));
passButton.addEventListener("mouseup", () => passButton.classList.remove("btn-danger"));

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        if (!countdown) {
            startGame();
        } else {
            passBomb();
        }
        event.preventDefault();
    }
});
