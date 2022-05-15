import {formatNumber} from '../utils/formatNumber.js'

export default class Result {
  constructor(element) {
    this.counter = element;
    this.root = this.counter.querySelector('.counter__result');
    this.riskNormElem = this.root.querySelector('#risk-norm');
    this.riskMinimalElem = this.root.querySelector('#risk-minimal');
    this.riskMaximalElem = this.root.querySelector('#risk-maximal');
  }

  show(risk) {
    this.riskNormElem.textContent = formatNumber(risk.norm);
    this.riskMinimalElem.textContent = formatNumber(risk.minimal);
    this.riskMaximalElem.textContent = formatNumber(risk.maximal);

    this.root.classList.remove('counter__result--hidden');
  }

  hide() {
    this.root.classList.add('counter__result--hidden');

    this.riskNormElem.textContent = 0;
    this.riskMinimalElem.textContent = 0;
    this.riskMaximalElem.textContent = 0;
  }
}
