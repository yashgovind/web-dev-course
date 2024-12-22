const panelBottom = document.getElementById("panel-bottom");
const timer = document.getElementById("timer");
const hit = document.getElementById("hit");
const scoreDisplay = document.getElementById("score");
let timerVal = 60;
let bubbles = "";
let score = 0;
let currentHit = 0;

function makeBubbles() {
  for (let i = 0; i <102; i++) {
    //generate a random number between 1 and 20 and make bubbles../
    let randomNum = Math.floor(Math.random() * 20);
    bubbles += `<div class = "bubble">${randomNum}</div>`;
    // ok bubbles are getting generated.
  }
  panelBottom.innerHTML = bubbles; // add to the dom../
}
function setTimer() {
    // until the timer reaches 0 ,decrement the timer and set its value to dom
    let newtimer = setInterval(() => {
        if (timerVal > 0) {
            timerVal--;
            timer.textContent = timerVal;
        }
        else {
            clearInterval(newtimer);
            panelBottom.innerHTML = `<h1>Game Over !!!!!!</h1>`;
        }
    }, 1000);
}
function getNewHit() { 
    currentHit = Math.floor(Math.random() * 10);
    hit.textContent = currentHit;
}
function IncreaseScore() {
    if (score >= 0) {
        score+=10; // increase the score value by 10 each time a bubble is hit
        scoreDisplay.textContent = score;
    }
}
panelBottom.addEventListener("click", (e) => {
    let clikedBubble = (parseInt((e.target.textContent)));
    if (clikedBubble === currentHit) {
        IncreaseScore();
        makeBubbles();
        getNewHit();
    }

})
makeBubbles();
setTimer();
getNewHit();






