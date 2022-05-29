const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};
refs.btnStart.addEventListener('click', onBtnStartClick);
refs.btnStop.addEventListener('click', onBtnStopClick);
let timerId = null;
refs.btnStop.disabled = true;

function onBtnStartClick() {
  changeBgc();
  refs.btnStop.disabled = false;
  refs.btnStart.disabled = true;
}
function onBtnStopClick() {
  clearInterval(timerId);
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function changeBgc() {
  timerId = setInterval(() => (document.body.style.backgroundColor = getRandomHexColor()), 1000);
}
