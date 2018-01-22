import {CalcState} from './calc/calc.component';

export const NUMBER = 'NUMBER';
export const OPERATOR = 'OPERATOR';
export const BINARY_OPERATOR = 'BINARY_OPERATOR';
export const RESULT = 'RESULT';
export const CLEAR = 'CLEAR';
export const CLEAR_ALL = 'CLEAR_ALL';
export const OFF = 'OFF';

const defaultState: CalcState = {
  operandA: null,
  operandB: null,
  operator: null,
  display: null,
  currentOperand: 'A',
  enabled: false
};

export function calcReducer(oldState: CalcState = defaultState, {type, payload}) {
  if (!oldState.enabled && type !== CLEAR_ALL) {
    return oldState;
  }

  switch (type) {
    case NUMBER:
      return processNumber(oldState, payload);

    case BINARY_OPERATOR:
      return processBinaryOperator(oldState, payload);

    case OPERATOR:
      return processOperator(oldState, payload);

    case CLEAR:
      return processClear(oldState);

    case CLEAR_ALL:
      return processClearAll(oldState);

    case OFF:
      return processOff(oldState);

    case RESULT:
      return processResult(oldState);

    default:
      return oldState;
  }
}

function processNumber(oldState: CalcState, payload) {
  const state = Object.assign({}, oldState);

  payload = Number(payload);

  if (state.currentOperand === 'A') {
    state.operandA = calcNumber(state.operandA, payload);

    state.display = state.operandA;
  } else if (state.currentOperand === 'B') {
    state.operandB = calcNumber(state.operandB, payload);

    state.display = state.operandB;
  }

  return state;
}

function processBinaryOperator(oldState: CalcState, payload) {
  const state = Object.assign({}, oldState);

  if (state.operandA === null) {
    return state;
  }

  if (state.operandA !== null && state.operandB === null) {
    state.operator = payload;

    state.currentOperand = 'B';
    state.display = state.operandA;
  }

  if (state.operandA !== null && state.operandB !== null && state.operator !== null) {
    state.operandA = calcBinaryOperation(state.operandA, state.operandB, state.operator);
    state.operandB = null;
    state.currentOperand = 'B';
    state.display = state.operandA;
  }

  return state;
}

function processOperator(oldState: CalcState, payload) {
  const state = Object.assign({}, oldState);

  if (state.currentOperand === 'A') {
    state.operandA = calcOperation(state.operandA, payload);

    state.display = state.operandA;
  } else if (state.currentOperand === 'B') {
    state.operandB = calcOperation(state.operandB, payload);

    state.display = state.operandB;
  }

  return state;
}

function processClear(oldState: CalcState) {
  const state = Object.assign({}, oldState);

  if (state.currentOperand === 'A') {
    state.operandA = 0;

    state.display = 0;
  } else if (state.currentOperand === 'B') {
    state.operandB = 0;

    state.display = 0;
  }

  return state;
}

function processClearAll(oldState: CalcState) {
  const state = Object.assign({}, oldState);

  if (!state.enabled) {
    state.enabled = true;
    state.display = 0;

    return state;
  }

  state.operandA = 0;
  state.operandB = null;
  state.operator = null;
  state.display = 0;
  state.currentOperand = 'A';

  return state;
}

function processOff(oldState: CalcState) {
  return Object.assign({}, oldState, defaultState);
}

function processResult(oldState: CalcState) {
  const state = Object.assign({}, oldState);

  if (!state.operator) {
    return state;
  }

  state.operandA = calcBinaryOperation(state.operandA, state.operandB, state.operator);
  state.operandB = null;
  state.currentOperand = 'A';
  state.display = state.operandA;
  state.operator = null;

  return state;
}

function calcBinaryOperation(a, b, operator) {
  switch (operator) {
    case 'plus':
      return a + b;

    case 'minus':
      return a - b;

    case 'multiply':
      return a * b;

    case 'divide':
      return a / b;
  }
}

function calcOperation(x, operator) {
  switch (operator) {
    case 'sign':
      return x * -1;

    case 'sqrt':
      return Math.sqrt(x);
  }
}

function calcNumber(x, number) {
  return x === null ? number : x * 10 + number;
}
