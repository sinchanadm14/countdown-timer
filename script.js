const startbutton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const completionMessage = document.getElementById("completionMessage");
let timer;
let remainingTime = 0;
let isPaused = false;
let targetTime = 0;
startbutton.addEventListener("click", function () {
    const dateInput = document.getElementById("date").value;
    const timeInput = document.getElementById("time").value;
    if (dateInput === "") {
        alert("Please select a date!");
        return;
    }
    if (timeInput === "") {
        alert("Please select a time!");
        return;
    }
    const targetDate = new Date(dateInput + "T" + timeInput);
    targetTime = targetDate.getTime();
    const now = new Date().getTime();
    if (targetTime <= now) {
        alert("Please select a future date and time!");
        return;
    }
    clearInterval(timer);
    isPaused = false;
    pauseButton.textContent = "Pause Timer";
    completionMessage.style.display = "none";
    alert("Timer Started!");
    timer = setInterval(function () {
        const now = new Date().getTime();
        const difference = targetTime - now;
        if (difference <= 0) {
            clearInterval(timer);
            days.textContent = "00";
            hours.textContent = "00";
            minutes.textContent = "00";
            seconds.textContent = "00";
            completionMessage.style.display = "block";
            return;
        }
        const d = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );
        const h = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );
        const m = Math.floor(
            (difference / (1000 * 60)) % 60
        );
        const s = Math.floor(
            (difference / 1000) % 60
        );
        days.textContent = d;
        hours.textContent = h;
        minutes.textContent = m;
        seconds.textContent = s;
    }, 1000);
});
pauseButton.addEventListener("click", function () {
    if (isPaused) {
        isPaused = false;
        pauseButton.textContent = "Pause Timer";
        targetTime = new Date().getTime() + remainingTime;
        timer = setInterval(function () {
            const now = new Date().getTime();
            const difference = targetTime - now;
            if (difference <= 0) {
                clearInterval(timer);
                days.textContent = "00";
                hours.textContent = "00";
                minutes.textContent = "00";
                seconds.textContent = "00";
                completionMessage.style.display = "block";
                return;
            }
            const d = Math.floor(
                difference / (1000 * 60 * 60 * 24)
            );
            const h = Math.floor(
                (difference / (1000 * 60 * 60)) % 24
            );
            const m = Math.floor(
                (difference / (1000 * 60)) % 60
            );
            const s = Math.floor(
                (difference / 1000) % 60
            );
            days.textContent = d;
            hours.textContent = h;
            minutes.textContent = m;
            seconds.textContent = s;
        }, 1000);
        return;
    }
    remainingTime = targetTime - new Date().getTime();
    if (remainingTime <= 0) {
        return;
    }
    clearInterval(timer);
    isPaused = true;
    pauseButton.textContent = "Resume Timer";
    alert("Timer Paused!");
});
resetButton.addEventListener("click", function () {
    clearInterval(timer);
    remainingTime = 0;
    targetTime = 0;
    isPaused = false;
    days.textContent = "00";
    hours.textContent = "00";
    minutes.textContent = "00";
    seconds.textContent = "00";
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
    localStorage.removeItem("date");
    localStorage.removeItem("time");
    pauseButton.textContent = "Pause Timer";
    completionMessage.style.display = "none";
    alert("Timer Reset!");
});
document.getElementById("date").addEventListener("change", function () {
    localStorage.setItem("date", this.value);
});

document.getElementById("time").addEventListener("change", function () {
    localStorage.setItem("time", this.value);
});


window.addEventListener("load", function () {
    document.getElementById("date").value = localStorage.getItem("date") || "";
    document.getElementById("time").value = localStorage.getItem("time") || "";
});