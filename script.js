// Update the live clock every second
const timeClock = () => {
    const DateTime = luxon.DateTime;
    const now = DateTime.now();
    document.getElementById('output').textContent = "Current Date: " + now.toFormat('cccc, yyyy LLL dd');
    document.getElementById('hours').textContent = now.toFormat('hh');
    document.getElementById('minutes').textContent = now.toFormat('mm');
    document.getElementById('seconds').textContent = now.toFormat('ss');
    document.getElementById('ampm').textContent = now.toFormat('a');
}

setInterval(timeClock, 1000);

// Set up event listener for "Set Timer" button
document.getElementById("setTimer").addEventListener("click", openModal);

// Modal elements
const modal = document.getElementById('timerModal');
const countdownDisplay = document.getElementById('modalCountdownDisplay');
const beepSound = document.getElementById('beepSound');

let countdownInterval;

// Open the modal with default values
function openModal() {
    modal.style.display = 'flex';
    document.getElementById("timerHours").value = 1;
    document.getElementById("timerMinutes").value = 1;
    document.getElementById("timerSeconds").value = 1;
}

// Close the modal and reset the state
function closeModal() {
    modal.style.display = 'none';
    countdownDisplay.textContent = "";
    resetTimerState();
}

// Reset the timer state after cancelling or when the timer ends
function resetTimerState() {
    clearInterval(countdownInterval);
    document.getElementById("startBtn").disabled = false;
    document.getElementById("cancelBtn").disabled = false;
    document.getElementById("timerHours").disabled = false;
    document.getElementById("timerMinutes").disabled = false;
    document.getElementById("timerSeconds").disabled = false;
}

// Start the timer countdown
function startTimer() {
    // Get values from the input fields
    const hours = parseInt(document.getElementById("timerHours").value) || 0;
    const minutes = parseInt(document.getElementById("timerMinutes").value) || 0;
    const seconds = parseInt(document.getElementById("timerSeconds").value) || 0;

    // Calculate total seconds
    let totalSeconds = (hours * 3600) + (minutes * 60) + seconds;

    if (totalSeconds <= 0) {
        alert("Please enter a valid time!");
        return;
    }

    // Disable buttons and input fields while the timer is active
    document.getElementById("startBtn").disabled = true;
    document.getElementById("cancelBtn").disabled = true;
    document.getElementById("timerHours").disabled = true;
    document.getElementById("timerMinutes").disabled = true;
    document.getElementById("timerSeconds").disabled = true;

    // Start countdown
    countdownInterval = setInterval(() => {
        const h = Math.floor(totalSeconds / 3600); // Hours remaining
        const m = Math.floor((totalSeconds % 3600) / 60); // Minutes remaining
        const s = totalSeconds % 60; // Seconds remaining

        countdownDisplay.textContent = `Time Left: ${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

        if (totalSeconds <= 0) {
            clearInterval(countdownInterval);
            beepSound.play(); // Play beep sound
            countdownDisplay.textContent = "⏰ Time's up!";
            resetTimerState(); // Reset state when timer ends
        }

        totalSeconds--;
    }, 1000);
}
