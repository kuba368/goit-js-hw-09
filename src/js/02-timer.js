import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//querySelectors
const dateInput = document.querySelector('input#datetime-picker');
const timer = document.querySelector('.timer');
const field = document.querySelectorAll('div.field');
const fieldValue = document.querySelectorAll('span.value');
const fieldLabel = document.querySelectorAll('span.label');
const button = document.querySelector('button[data-start]');
const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minutesDisplay = document.querySelector('[data-minutes]');
const secondsDisplay = document.querySelector('[data-seconds]');

button.disabled = true;

// flatpickr options
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const date = new Date();
    if (date.getTime() > selectedDates[0].getTime()) {
      Notify.failure('Please choose a date in the future!');
      button.disabled = true;
    } else {
      button.disabled = false;
      timeLeft = selectedDates[0].getTime() - date.getTime();
      console.log(timeLeft);
      let timerID = setInterval(() => {
        timeLeft -= 1000;
        if (timeLeft <= 0) {
          timeLeft = 0;
          clearInterval(timerID);
        }
        updateTimer(convertMs(timeLeft));
      }, 1000);
    }
  },
};

const convertMs = ms => {
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
};

const addLeadingZero = value => {
  String(value).padStart(2, 0);
};
function updateTimer({ days, hours, minutes, seconds }) {
  daysDisplay.textContent = days.toString().padStart(2, '0');
  hoursDisplay.textContent = hours.toString().padStart(2, '0');
  minutesDisplay.textContent = minutes.toString().padStart(2, '0');
  secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

// timer styles
timer.style.display = 'flex';
timer.style.gap = '10px';
field.forEach(ele => {
  ele.style.display = 'flex';
  ele.style.flexDirection = 'column';
  ele.style.alignItems = 'center';
  ele.style.width = '75px';
});
fieldValue.forEach(ele => {
  ele.style.fontSize = '50px';
});
fieldLabel.forEach(ele => {
  ele.style.textTransform = 'uppercase';
});

flatpickr(dateInput, options);
