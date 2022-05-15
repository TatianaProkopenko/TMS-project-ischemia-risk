import { formatInput } from '../utils/formatInput.js'

import Result from "./Result.js";

const vasospasmScoreRatios = new Map([
  ['withoutvas', 0],
  ['withvas', 1]
]);

const lindegaardScoreRatios = new Map ([
  ['lindzero', 0],
  ['lindone', 1],
  ['lindtwo', 2]
]);

const hamidovVasospasmScoreRatio = new Map ([
  ['hamidovzero', 0],
  ['hamidovone', 1],
  ['hamidovtwo', 2]
])

const ischemiaValueScoreRatio = new Map ([
  ['ischemiazero', 0],
  ['ischemiaone', 1],
  ['ischemiatwo',2],
  ['ischemiathree',3]
])

export default class RiskCounter{
  constructor(element){
    this.root = element;
    this.form = this.root.querySelector('.counter__form');
    this.elements = this.form.elements;
    this.parameters = [...this.elements.parameters.elements];
    this.vasospasmInputs = this.form.elements.vasospasm;
    this.hunthessInput = this.form.elements.hunthess;
    this.fischerInput = this.form.elements.fischer;
    this.lindegaardInputs = this.form.elements.lindegaard;
    this.hamidovInputs = this.form.elements.hamidov;
    this.ischemiaInputs = this.form.elements.ischemia;

    this.calculateButton = this.form.elements['submit'];
    this.resetButton = this.form.elements['reset'];

    this.result = new Result(this.root);

    
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);

    }

    handleInput(evt) {
      const target = evt.target;
      if (target.closest('[name="parameters"]')) {
      target.value = formatInput(target);
    
     }
  
     this.calculateButton.disabled = !this.form.checkValidity();
     this.resetButton.disabled = !this.parameters.some(input => input.value);
    }

  handleSubmit(evt) {
    evt.preventDefault();

    const riskNorm = this.getRiskNorm();

    const risk = {
      norm: riskNorm,
      minimal: this.getRiskMinimal(riskNorm),
      maximal: this.getRiskMaximal(riskNorm)
    }

    this.result.show(risk);
  }

  handleReset(){
   this.calculateButton.disabled = true;
   this.resetButton.disabled = true;
   this.result.hide();
  }

  addEventListeners() {
    this.form.addEventListener('input', this.handleInput);
    this.form.addEventListener('submit', this.handleSubmit);
    this.form.addEventListener('reset', this.handleReset);
  }


 init(){
   this.addEventListeners();
 }

 getVasospasmRatio(){
  const vasospasm = this.vasospasmInputs.value;
  return vasospasmScoreRatios.get(vasospasm);
 }

 getLindegaardRatio(){
  const lindegaard= this.lindegaardInputs.value;
  return lindegaardScoreRatios.get(lindegaard);
 }

 getHamidovRatio(){
   const hamidov = this.hamidovInputs.value;
   return hamidovVasospasmScoreRatio.get(hamidov);
 }

 getIschemiaRatio(){
   const ischemia = this.ischemiaInputs.value;
   return ischemiaValueScoreRatio.get(ischemia);
 }



 getRiskNorm(){
  const hunthess = Number(this.hunthessInput.value)
  
  const fischer = Number(this.fischerInput.value);
  
  const vasospasmRatio = this.getVasospasmRatio();
  const lindegaardRatio = this.getLindegaardRatio();
  const hamidovRatio = this.getHamidovRatio();
  const ischemiaRatio = this.getIschemiaRatio();

  let b = hunthess >= 4? 1.597 : 0;
  let c = fischer >= 3? 0.793 : 0;

     
  const x = -2.388 + b + c+ 1.376*vasospasmRatio + 1.943*lindegaardRatio - 0.605* hamidovRatio+1.420*ischemiaRatio;

  const a = Math.exp(-x);

  const riskNorm = (1/(1+a));

  return (riskNorm.toFixed(3));
 } 

 getRiskMinimal(riskNorm){
  return Math.round (riskNorm*0.95);
 } 

 getRiskMaximal (riskNorm){
   return Math.round(riskNorm*1.05);
 }

}