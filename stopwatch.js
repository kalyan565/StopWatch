const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const milliSecondsLabel = document.getElementById('millisec');

const startButton = document.getElementById('startbtn');
const stopButton = document.getElementById('stopbtn');
const pauseButton = document.getElementById('pausetbtn');
const resetButton = document.getElementById('resetbtn');

const lapList = document.getElementById('lapList');

//stopwatch varibales

let minutes = 0;
let seconds =0;
let milliseconds =0;
let interval;

startButton.addEventListener('click',startTimer);
stopButton.addEventListener('click',stopTimer);
pauseButton.addEventListener('click',pauseTimer);
resetButton.addEventListener('click',resetTimer);

function startTimer(){
    interval = setInterval(updateTimer,1); //setInterval() is used to exectute a function repetadly 
    startButton.disabled = true;
    pauseButton.disabled = false;
}
function stopTimer(){
    clearInterval(interval);
    addTOLapList();
    resetTimerData();
    startButton.disabled = false;

}
function pauseTimer(){
    clearInterval(interval);
    pauseButton.disabled = true;
    startButton.disabled = false;
}
function resetTimer(){
    clearInterval(interval);
    resetTimerData();
    startButton.disabled = false; // because when we rest the timer again we nedd to start the timeer using the start button
}

function updateTimer(){
    milliseconds++;
    if(milliseconds === 1000){  //1sec = 1000 milliSec
        milliseconds=0;
        seconds++;
    }
    if(seconds===60){ //1min = 60sec
        seconds=0;
        minutes++;
    }
    displayTimmer();
}

function displayTimmer(){
    milliSecondsLabel.textContent = padTime(milliseconds);
    secondsLabel.textContent = padTime(seconds);
    minutesLabel.textContent = padTime(minutes);

}
function padTime(time){
    return time.toString().padStart(2,'0')
}
function resetTimerData(){
    minutes=0;
    seconds=0;
    milliseconds=0;
    displayTimmer();
}
function addTOLapList(){
     const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;// `` - this is the template strig character
     const listItem = document.createElement('li'); 

    listItem.innerHTML = `<span>Lap ${lapList.childElementCount + 1}:</span>${lapTime} `;
    lapList.appendChild(listItem);
}