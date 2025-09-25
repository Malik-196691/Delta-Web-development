let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "green", "blue", "red"];
let started = false;
let level = 0;
let highScore = 0;
let h2 = document.querySelector("h2");
// If h2 is null, wait for DOMContentLoaded
if (!h2) {
    document.addEventListener("DOMContentLoaded", () => {
        h2 = document.querySelector("h2");
    });
}

// Create and display high score element
let highScoreElem = document.createElement("h3");
highScoreElem.innerText = `High Score: ${highScore}`;
document.body.insertBefore(highScoreElem, h2.nextSibling);

document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 200);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4); // Fix: should be 0-3
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    btnFlash(randBtn);
}

function checkAns(idx) {
    if (gameSeq[idx] == userSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 500);
        }
    } else {
        // Update high score if needed
        if (level > highScore) {
            highScore = level;
            highScoreElem.innerText = `High Score: ${highScore}`;
        }
        h2.innerHTML = `Game Over! Your score was : <b>${level}</b> <br> Press any key to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 300);
        reset();
    }
}

function btnPress(params) {
    let btn = this;
    btnFlash(btn);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (const btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset(params) {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    // h2.innerText = "Press any key to start";
}