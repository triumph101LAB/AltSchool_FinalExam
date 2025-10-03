// Stopwatch Variables
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let intervalId = null;

// Get DOM elements

const hoursEl = document.querySelector('.hours');
const minuteEl = document.querySelector('.minute');
const secondsEl = document.querySelector('.seconds');


const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');

// Function to format time with leading zeros
function formatTime(time) {
    return time.toString().padStart(2, '0');
}

// Function to update the display
function updateDisplay() {
    const totalMs = elapsedTime;
    
    
    const hours = Math.floor((totalMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));// Login for the hours
    const minutes = Math.floor((totalMs % (1000 * 60 * 60)) / (1000 * 60));// logic for the minutes
    const seconds = Math.floor((totalMs % (1000 * 60)) / 1000);// Logic for the seconds

    hoursEl.textContent = formatTime(hours);
    minuteEl.textContent = formatTime(minutes);
    secondsEl.textContent = formatTime(seconds);

}

// Function to update time while running
function updateTime() {
    if (isRunning) {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }
}

// Start function
function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        isRunning = true;
        intervalId = setInterval(updateTime, 10);
        
        // Update button states
        startBtn.disabled = true;
        stopBtn.disabled = false;
    }
}

// Stop function
function stop() {
    if (isRunning) {
        isRunning = false;
        clearInterval(intervalId);
        
        // Update button states
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }
}

// Reset function
function reset() {
    isRunning = false;
    clearInterval(intervalId);
    elapsedTime = 0;
    startTime = 0;
    
    // Update button states
    startBtn.disabled = false;
    stopBtn.disabled = true;
    
    updateDisplay();
}

// Event listeners
startBtn.addEventListener('click', start);// to listen for the user to click on the start button
stopBtn.addEventListener('click', stop); // to listen for the user to click on the stop button
resetBtn.addEventListener('click', reset);// To listen for the user toclick on the reset button

// Initialize display when page loads
// It resets the display to 00 for all time units when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
});