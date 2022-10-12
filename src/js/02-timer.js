import flatpick from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';
const flatpickr = require('flatpickr');
const refs = {
  btnStart: document.querySelector('button[data-start]'),
  daysOutput: document.querySelector('[data-days]'),
  hoursOutput: document.querySelector('[data-hours]'),
  minutesOutput: document.querySelector('[data-minutes]'),
  secondsOutput: document.querySelector('[data-seconds]'),
  timerContainer: document.querySelector('.timer'),
  inputEl: document.querySelector('input'),
};

refs.inputEl.style.display = 'block';
refs.inputEl.style.marginRight = 'auto';
refs.inputEl.style.marginLeft = 'auto';
refs.inputEl.style.fontSize = '30px';

refs.timerContainer.style.display = 'flex';
refs.timerContainer.style.justifyContent = 'space-around';
refs.timerContainer.style.width = '600px';
refs.timerContainer.style.margin = 'auto';
refs.timerContainer.style.fontSize = '30px';
refs.timerContainer.style.fontWeight = 'bold';
refs.timerContainer.style.color = 'grey';

refs.btnStart.style.display = 'block';
refs.btnStart.style.margin = 'auto';
refs.btnStart.style.marginBottom = '40px';
refs.btnStart.style.marginTop = '100px';
refs.btnStart.style.width = '150px';
refs.btnStart.style.fontSize = '40px';
refs.btnStart.style.color = 'red';
refs.btnStart.style.heigt = '100px';

refs.daysOutput.style.display = 'block';
refs.daysOutput.style.textAlign = 'center';
refs.daysOutput.style.fontSize = '50px';

refs.hoursOutput.style.textAlign = 'center';
refs.hoursOutput.style.display = 'block';
refs.hoursOutput.style.fontSize = '50px';

refs.minutesOutput.style.textAlign = 'center';
refs.minutesOutput.style.display = 'block';
refs.minutesOutput.style.fontSize = '50px';

refs.secondsOutput.style.textAlign = 'center';
refs.secondsOutput.style.display = 'block';
refs.secondsOutput.style.fontSize = '50px';

let userDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userDate = selectedDates[0].getTime();

    if (userDate - Date.now() <= 0) {
      Notiflix.Report.failure(
        'ATTENTION, PLEASE!!!',
        'Please choose a date in the future',
        'Ok'
      );
      return;
    } else {
      refs.btnStart.disabled = !refs.btnStart.disabled;
    }
    refs.btnStart.addEventListener('click', onClickBtnStart);
  },
};
refs.btnStart.disabled = !refs.btnStart.disabled;
flatpick('input[type="text"]', options);

function onClickBtnStart() {
  refs.btnStart.disabled = !refs.btnStart.disabled;
  const itervalId = setInterval(() => {
    const currentDate = Date.now();
    const userTime = userDate - currentDate;
    if (userTime <= 0) {
      clearInterval(itervalId);
      return;
    }
    const userTimeFormat = convertMs(userTime);
    refs.daysOutput.textContent = addLeadingZero(userTimeFormat.days);
    refs.hoursOutput.textContent = addLeadingZero(userTimeFormat.hours);
    refs.minutesOutput.textContent = addLeadingZero(userTimeFormat.minutes);
    refs.secondsOutput.textContent = addLeadingZero(userTimeFormat.seconds);
  }, 1000);
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

function addLeadingZero(value) {
  let number = 2;
  if (value >= 99) {
    number = 3;
  }
  return value.toString().padStart(number, '0');
}
