import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  let {
    elements: { delay, step, amount },
  } = e.currentTarget;
  let amountEl = Number(amount.value);
  let stepEl = Number(step.value);
  let delayEl = Number(delay.value);

  // ------------------Теж працює----------------------------
  // let amountEl = Number(formEl.elements.amount.value);
  // let stepEl = Number(formEl.elements.step.value);
  // let delayEl = Number(formEl.elements.delay.value);

  for (let positionEl = 1; positionEl <= amountEl; positionEl += 1) {
    createPromise(positionEl, delayEl)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
          {
            timeout: 10000,
          }
        );
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`,
          {
            timeout: 10000,
          }
        );
      });
    delayEl += stepEl;
  }
}

// -----------------Створює проміс-----------------------
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay }); // Fulfill
      } else {
        reject({ position, delay }); // Reject
      }
    }, delay);
  });
}
