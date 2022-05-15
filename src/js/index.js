import RiskCounter from './modules/RiskCounter.js';

const counterElements = document.querySelectorAll('.counter');

counterElements.forEach(elem => {
  const counter = new RiskCounter(elem);
  counter.init();
});