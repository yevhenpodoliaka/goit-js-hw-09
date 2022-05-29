import Notiflix from 'notiflix';
const refs = {
  form: document.querySelector('.form'),
};
refs.form.addEventListener('submit', onSubmit);

let totalDelay = 0;

function onSubmit(e) {
  e.preventDefault();
  const delay = e.target.elements.delay.value;
  const step = e.target.elements.step.value;
  const amount = e.target.elements.amount.value;

  setTimeout(() => {
    for (let i = 1; i <= amount; i += 1) {
      totalDelay += +step;
      createPromise([i], totalDelay);
    }
  }, delay);
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}
