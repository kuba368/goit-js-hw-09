const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let changeBodyColorInterval = null;

stopButton.disabled = true;

const startHandler = () => {
  changeBodyColorInterval = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startButton.disabled = true;
  stopButton.disabled = false;
};

const stopHandler = () => {
  clearInterval(changeBodyColorInterval);
  startButton.disabled = false;
  stopButton.disabled = true;
};

startButton.addEventListener('click', startHandler);
stopButton.addEventListener('click', stopHandler);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
