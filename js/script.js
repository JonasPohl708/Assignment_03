// ------------------------------------
// Global Game Variables
// ------------------------------------

const holes = document.getElementsByClassName("hole");  
let score = 0;
let timeLeft = 30;

let timerId = null;         // countdown timer
let moleTimerId = null;     // mole movement timer
let activeIndex = -1;       // -1 means no mole displayed


// ------------------------------------
// Highscore Handling
// ------------------------------------

function showHighScore() {
    const best = localStorage.getItem("wamHighScore");
    const highScoreLine = document.getElementById("highScoreLine");

    if (best === null) {
        highScoreLine.innerText = "No high score yet – start playing!";
    } else {
        highScoreLine.innerText = "High score: " + best;
    }
}


// ------------------------------------
// Mole Control
// ------------------------------------

function removeMole() {
    if (activeIndex >= 0) {
        holes[activeIndex].classList.remove("mole");
    }
    activeIndex = -1;
}

function showRandomMole() {
    removeMole();

    const randomIndex = Math.floor(Math.random() * holes.length);
    activeIndex = randomIndex;

    holes[randomIndex].classList.add("mole");
}


// ------------------------------------
// Game Flow Functions
// ------------------------------------

function startGame() {
    // Reset values
    score = 0;
    timeLeft = 30;

    document.getElementById("score").innerText = score;
    document.getElementById("time").innerText = timeLeft;
    document.getElementById("message").innerText = "";

    // Stop old timers if they exist
    if (timerId !== null) clearInterval(timerId);
    if (moleTimerId !== null) clearInterval(moleTimerId);

    // Start new countdown
    timerId = setInterval(function () {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);

    // Start mole movement
    moleTimerId = setInterval(showRandomMole, 800);
}

function endGame() {
    clearInterval(timerId);
    clearInterval(moleTimerId);

    removeMole();
    document.getElementById("message").innerText = "Game over!";

    const best = localStorage.getItem("wamHighScore");

    // Update high score if needed
    if (best === null || score > best) {
        localStorage.setItem("wamHighScore", score);
        document.getElementById("message").innerText += " New high score!";
    }

    showHighScore();
}


// ------------------------------------
// Click Listeners for All Holes
// ------------------------------------

for (let i = 0; i < holes.length; i++) {
    holes[i].addEventListener("click", function () {
        const index = parseInt(this.getAttribute("data-index"));

        if (index === activeIndex) {
            score++;
            document.getElementById("score").innerText = score;
            removeMole();
        }
    });
}


// ------------------------------------
// Start Button
// ------------------------------------

document.getElementById("startBtn").addEventListener("click", startGame);


// ------------------------------------
// high score on page load
// ------------------------------------

showHighScore();
