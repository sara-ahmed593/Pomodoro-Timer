const clickSound = new Audio("./src/assets/sound/click-btn.mp3");
const alarmSound = new Audio("./src/assets/sound/alarm-sound.mp3");

const modeBtns = document.querySelectorAll('.mode-btn');
let activeBtn = document.querySelector(".mode-btn.active");
const timeDisplay = document.querySelector(".time-display");
const startBtn = document.querySelector(".start-btn");
const nextBtn = document.querySelector(".next-btn");
const container = document.querySelector(".container");
const progress = document.querySelector(".progress");
const sessionCount = document.querySelector(".session-count");
const addtask = document.querySelector(".addtask-btn");
const addtaskContainer = document.querySelector(".add-container");


export let currentMode = "Pomodoro";
export let isRunning = false;
let round = 1;
let timer;

// Timer configuration
export const modes = {
    "Pomodoro": {
        minutes: 25,
        color: "#AF4949"
    },
    "Short Break": {
        minutes: 5,
        color: "#4A7950"
    },
    "Long Break": {
        minutes: 15,
        color: "#2F6A95"
    },
    "Stopwatch": {
        minutes: 0,
        color: "#acaa48"
    }
};

export let timeLeft = modes[currentMode].minutes * 60;
let totalTime = timeLeft;


//reset timer
export function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    startBtn.textContent = "START";
    nextBtn.classList.add("hidden");
    progress.style.width = "0%";
}

//update time
function updateTime() {
    timeLeft--;
    progress.style.width = ((totalTime - timeLeft) / totalTime) * 100 + '%';

    const min = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const sec = String(timeLeft % 60).padStart(2, "0");
    timeDisplay.textContent = `${min}:${sec}`;

    if (timeLeft <= 0) {
        resetTimer();
        round++;
        sessionCount.textContent = `#${round}`;

        modeBtns[0].click();
        alarmSound.currentTime = 0;
        alarmSound.play();
    }
}

// Change timer mode

modeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (activeBtn === btn) {
            return;
        }
        activeBtn.classList.remove("active");
        btn.classList.add("active");
        activeBtn = btn;
        currentMode = btn.textContent;
        if (currentMode === "Stopwatch") {
            elapsedTime = 0;
            timeDisplay.textContent = "00:00";


        } else {
            timeLeft = modes[currentMode].minutes * 60;
            totalTime = timeLeft;
            timeDisplay.textContent = modes[currentMode].minutes + ':00';

        }



        container.style.background = modes[currentMode].color;
        startBtn.style.color = modes[currentMode].color;

        resetTimer();

        addtask.classList.remove("hidden");
        addtaskContainer.classList.add("hidden");
    });
});


// Start / Pause timer
startBtn.addEventListener("click", () => {


    isRunning = !isRunning;

    clickSound.currentTime = 0;
    clickSound.play();
    if (isRunning) {
        nextBtn.classList.remove("hidden");
        if (currentMode === "Stopwatch") {
            nextBtn.classList.add("hidden");
            startBtn.textContent = "STOP";

            timer = setInterval(updateStopwatch, 1000);
        } else {
            startBtn.textContent = "PAUSE";

            timer = setInterval(updateTime, 1000);
        }
    } else {
        startBtn.textContent = "START";
        nextBtn.classList.add("hidden");
        clearInterval(timer);


    }
});



// Next State Skipper
nextBtn.addEventListener("click", () => {
    if (currentMode === "Pomodoro") {
        modeBtns[1].click();
    } else {
        modeBtns[0].click();
    }
});

//stopwatch update
let elapsedTime = 0;
function updateStopwatch() {
    elapsedTime++;

    const min = String(Math.floor(elapsedTime / 60)).padStart(2, "0");
    const sec = String(elapsedTime % 60).padStart(2, "0");

    timeDisplay.textContent = `${min}:${sec}`;
}