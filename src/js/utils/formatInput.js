const LEAD_ZERO = /^0+/;
const NOT_NUMBERS = /[^\d]/g;

export function formatInput(input) {
  return input.value.replace(NOT_NUMBERS, '').replace(LEAD_ZERO, '');
}