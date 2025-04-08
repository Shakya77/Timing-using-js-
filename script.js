const timeClock = () => {
    const DateTime = luxon.DateTime;
    const now = DateTime.now();
    document.getElementById('output').textContent = "Current Date: " + now.toFormat('yyyy LLL dd');
    document.getElementById('hours').textContent = now.toFormat('hh');
    document.getElementById('minutes').textContent = now.toFormat('mm');
    document.getElementById('seconds').textContent = now.toFormat('ss');
    document.getElementById('ampm').textContent = now.toFormat('a');
}

setInterval(timeClock, 1000);

const setTimerBtn = document.getElementById("setTimer").addEventListener("click", openModal);
const modal = document.getElementById('timerModal');
const countdownDisplay = document.getElementById('countdownDisplay');
const beepSound = document.getElementById('beepSound');

let timerInterval;

function openModal() {
    document.getElementById('timerModal').style.display = 'flex';
    document.getElementById("timerHours").value = 1;
    document.getElementById("timerMinutes").value = 1;
    document.getElementById("timerSeconds").value = 1;
}


function closeModal() {
    document.getElementById('timerModal').style.display = 'none';
    document.getElementById('modalCountdownDisplay').textContent = "";
    document.getElementById('startBtn').disabled = false;
    document.getElementById('cancelBtn').disabled = false;
    clearInterval(window.countdownInterval);
}

function startTimer() {
    // Get values from the input fields
    const hours = parseInt(document.getElementById("timerHours").value) || 0;
    const minutes = parseInt(document.getElementById("timerMinutes").value) || 0;
    const seconds = parseInt(document.getElementById("timerSeconds").value) || 0;

    // Calculate the total seconds
    let totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

    if (totalSeconds <= 0) {
        alert("Please enter a valid time!");
        return;
    }

    // Disable buttons and input fields
    document.getElementById("startBtn").disabled = true;
    document.getElementById("cancelBtn").disabled = true;
    document.getElementById("timerHours").disabled = true;
    document.getElementById("timerMinutes").disabled = true;
    document.getElementById("timerSeconds").disabled = true;

    const countdownDisplay = document.getElementById("modalCountdownDisplay");

    window.countdownInterval = setInterval(() => {
        const h = Math.floor(totalSeconds / 3600); // Hours remaining
        const m = Math.floor((totalSeconds % 3600) / 60); // Minutes remaining
        const s = totalSeconds % 60; // Seconds remaining

        countdownDisplay.textContent = `Time Left: ${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

        if (totalSeconds <= 0) {
            clearInterval(window.countdownInterval);
            document.getElementById('beepSound').play();
            countdownDisplay.textContent = "⏰ Time's up!";
            document.getElementById("startBtn").disabled = false;
            document.getElementById("cancelBtn").disabled = false;
        }

        totalSeconds--;
    }, 1000);
}

