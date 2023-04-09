import { Notify } from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const firstDelay = form.querySelector('input[name="delay"]').value - 0;
  const delayStep = form.querySelector('input[name="step"]').value - 0;
  const amount = form.querySelector('input[name="amount"]').value - 0;
  let position = 1;
  let delayCount = firstDelay;
  createPromise(position, firstDelay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
  if (amount > 1) {
    const promiseTimerID = setInterval(() => {
      position++;
      createPromise(position, delayStep)
        .then(({ position, delay }) => {
          delayCount += delay;
          Notify.success(`✅ Fulfilled promise ${position} in ${delayCount}ms`);
        })
        .catch(({ position, delay }) => {
          delayCount += delay;
          Notify.failure(`❌ Rejected promise ${position} in ${delayCount}ms`);
        });
      if (position === amount) {
        clearInterval(promiseTimerID);
      }
    }, delayStep);
  }
  form.reset();
});
