'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
  startBtn: document.querySelector('[data-start]'),
  datePicker: document.querySelector('#datetime-picker'),
};

refs.startBtn.disabled = true;
let endDate = null;

flatpickr(refs.datePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate.getTime() < new Date().getTime()) {
      iziToast.error({
        position: 'topRight',
        title: 'Error!',
        message: 'Please choose a date in the future',
      });
      refs.startBtn.disabled = true;
      return;
    }

    iziToast.success({
      position: 'topRight',
      title: 'Success!',
      message: `It's valide date, click on "Start"`,
    });

    endDate = selectedDate;
    refs.startBtn.disabled = false;
  },
});

refs.startBtn.addEventListener('click', onclick);

function onclick() {
  refs.startBtn.disabled = true;

  const timer = setInterval(() => {
    const resultDate = selectDate();

    if (resultDate <= 0) {
      clearInterval(timer);
      refs.daysEl.textContent = '00';
      refs.hoursEl.textContent = '00';
      refs.minutesEl.textContent = '00';
      refs.secondsEl.textContent = '00';
      return;
    }

    const datatimeComponents = convertMs(resultDate);

    return clockInterface(datatimeComponents);
  }, 1000);
}

function selectDate() {
  const now = Date.now();
  const distance = endDate.getTime() - now;

  return distance < 0 ? 0 : distance;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function clockInterface({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = days;
  refs.hoursEl.textContent = hours;
  refs.minutesEl.textContent = minutes;
  refs.secondsEl.textContent = seconds;
}