import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  outputDays: document.querySelector('[data-days]'),
  outputHours: document.querySelector('[data-hours]'),
  outputMimutes: document.querySelector('[data-minutes]'),
  outputSeconds: document.querySelector('[data-seconds]'),
};

refs.btnStart.addEventListener('click', goTimer);

refs.btnStart.disabled = true;

let inputDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onChange(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      refs.btnStart.disabled = true;
      Notiflix.Report.failure('Please choose a date in the future');
    } else {
      inputDate = selectedDates[0].getTime();
      refs.btnStart.disabled = false;
    }
  },
  // onClose(selectedDates) {
  //   if (selectedDates[0] < Date.now()) {
  //     Notiflix.Report.failure('Please choose a date in the future');
  //   } else {
  //     inputDate = selectedDates[0].getTime();
  //     refs.btnStart.disabled = false;
  //   }
  // },
};
Notiflix.Report.init({
  zindex: 100000000000,
});
flatpickr(refs.input, options);

function goTimer() {
  const dateNow = Date.now();
  let time = inputDate - dateNow;

  setInterval(() => {
    let showTime = (time -= 1000);
    const { days, hours, minutes, seconds } = convertMs(showTime);
    refs.outputDays.textContent = addLeadingZero(days);
    refs.outputHours.textContent = addLeadingZero(hours);
    refs.outputMimutes.textContent = addLeadingZero(minutes);
    refs.outputSeconds.textContent = addLeadingZero(seconds);
  }, 1000);
  refs.btnStart.disabled = true;
  refs.input.disabled = true;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
