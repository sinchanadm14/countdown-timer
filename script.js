const startButton = document.getElementById("start");
startButton.addEventListener("click", function() {
    alert("Timer Started!");
});

const pauseButton = document.getElementById("pause");
pauseButton.addEventListener("click", function() {
    alert("Timer Paused!");
});

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function() {
    alert("Timer Reset!");
});

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

let count = 10;

let timer = setInterval(function() {
    seconds.textContent = count;
    count--;

    if (count < 0) {
        clearInterval(timer);
    }
}, 1000);
