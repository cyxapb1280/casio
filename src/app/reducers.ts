import {CalcState} from './calc/calc.component';

export const NUMBER = 'NUMBER';
export const OPERATOR = 'OPERATOR';
export const BINARY_OPERATOR = 'BINARY_OPERATOR';
export const RESULT = 'RESULT';
export const CLEAR = 'CLEAR';
export const CLEAR_ALL = 'CLEAR_ALL';
export const OFF = 'OFF';
export const FLOAT = 'FLOAT';
export const PERCENT = 'PERCENT';

const defaultState: CalcState = {
  operandA: null,
  operandB: null,
  operator: null,
  display: null,
  currentOperand: 'A',
  enabled: false,
  floatMode: false,
  percentBase: null
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

    case FLOAT:
      return processFloat(oldState);

    case PERCENT:
      return processPercents(oldState);

    default:
      return oldState;
  }
}

function processNumber(oldState: CalcState, payload) {
  const state = Object.assign({}, oldState);

  if (state.currentOperand === 'A') {
    state.operandA = calcNumber(state.operandA, payload, state.floatMode);

    state.display = state.operandA;
  } else if (state.currentOperand === 'B') {
    state.operandB = calcNumber(state.operandB, payload, state.floatMode);

    state.display = state.operandB;
  }

  state.floatMode = false;

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

  state.floatMode = false;

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

  state.floatMode = false;

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

  state.floatMode = false;

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
  state.floatMode = false;

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
  state.floatMode = false;

  return state;
}

function processPercents(oldState: CalcState) {
  const state = Object.assign({}, oldState);

  if (state.currentOperand === 'B' && state.operandA !== null && state.operandB !== null) {
    state.operandB = state.operandA / 100 * state.operandB;
  }

  return processResult(state);
}

function processFloat(oldState: CalcState) {
  const state = Object.assign({}, oldState);

  state.floatMode = true;

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

function calcNumber(x, number, floatMode) {
  let numberStr;

  if (floatMode) {
    numberStr = x === null ? '0.' + number : x + '.' + number;
  } else {
    numberStr = x === null ? number : x + number;
  }

  return Number(numberStr);
}
