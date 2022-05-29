import Notiflix from 'notiflix';
const refs = {
  form: document.querySelector('.form'),
};
refs.form.addEventListener('submit', onSubmit);



function onSubmit(e) {
  e.preventDefault();
  const delay = Number(e.target.elements.delay.value);
  const step = Number(e.target.elements.step.value);
  const amount = Number(e.target.elements.amount.value);
let totalDelay = delay
  setTimeout(() => {
    for (let i = 1; i <= amount; i += 1) {
          createPromise([i], totalDelay);
        totalDelay += step;
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
