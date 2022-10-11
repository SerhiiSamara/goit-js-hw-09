const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const elementColor = document.querySelector('body');
let intervalId = null;
btnStop.disabled = !btnStop.disabled;

btnStart.addEventListener('click', onStartBtnClick);
btnStop.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  intervalId = setInterval(() => {
    let randomColor = getRandomHexColor();
    elementColor.style.backgroundColor = randomColor;
  }, 1000);
  btnStart.disabled = !btnStart.disabled;
  btnStop.disabled = !btnStop.disabled;
}

function onStopBtnClick() {
  clearInterval(intervalId);
  btnStop.disabled = !btnStop.disabled;
  btnStart.disabled = !btnStart.disabled;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
