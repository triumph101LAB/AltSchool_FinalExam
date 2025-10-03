// Stopwatch Variables
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let intervalId = null;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');

function formatTime(num, len = 2) {
    return num.toString().padStart(len, '0');
}

// Function to update the display
function updateDisplay() {
    let totalMs = elapsedTime;
    let hours = Math.floor(totalMs / (1000 * 60 * 60));
    let minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((totalMs % (1000 * 60)) / 1000);
    let ms = Math.floor((totalMs % 1000) / 10); // two digits

    display.textContent = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(ms)}`;
}

// Function to update time while running
function updateTime() {
    if (isRunning) {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }
}

// Start/Stop function
function startStop() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        isRunning = true;
        intervalId = setInterval(updateTime, 10);
        startStopBtn.textContent = 'stop';
    } else {
        isRunning = false;
        clearInterval(intervalId);
        startStopBtn.textContent = 'start';
    }
}

// Reset function
function reset() {
    isRunning = false;
    clearInterval(intervalId);
    elapsedTime = 0;
    startTime = 0;
    updateDisplay();
    startStopBtn.textContent = 'start';
}

// Event listeners
startStopBtn.addEventListener('click', startStop);
const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', reset);

// Initialize display when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateDisplay();
    startStopBtn.textContent = 'start';
});
