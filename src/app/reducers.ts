import { CalcState } from './calc/calc.component';

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

export function calcReducer(oldState: CalcState = defaultState, { type, payload }) {
  const state = Object.assign({}, oldState);

  if (!state.enabled && type !== CLEAR_ALL) {
    return oldState;
  }

  switch (type) {
    case NUMBER:
      payload = Number(payload);

      if (state.currentOperand === 'A') {
        state.operandA = processNumber(state.operandA, payload);

        state.display = state.operandA;
      } else if (state.currentOperand === 'B') {
        state.operandB = processNumber(state.operandB, payload);

        state.display = state.operandB;
      }

      return state;

    case BINARY_OPERATOR:
      if (state.operandA === null) {
        return state;
      }

      if (state.operandA !== null && state.operandB === null) {
        state.operator = payload;

        state.currentOperand = 'B';
        state.display = state.operandA;
      }

      if (state.operandA !== null && state.operandB !== null && state.operator !== null) {
        state.operandA = processBinaryOperation(state.operandA, state.operandB, state.operator);
        state.operandB = null;
        state.currentOperand = 'B';
        state.display = state.operandA;
      }

      return state;

    case OPERATOR:
      if (state.currentOperand === 'A') {
        state.operandA = processOperation(state.operandA, payload);

        state.display = state.operandA;
      } else if (state.currentOperand === 'B') {
        state.operandB = processOperation(state.operandB, payload);

        state.display = state.operandB;
      }

      return state;

    case CLEAR:
      if (state.currentOperand === 'A') {
        state.operandA = null;

        state.display = 0;
      } else if (state.currentOperand === 'B') {
        state.operandB = null;

        state.display = 0;
      }

      return state;

    case CLEAR_ALL:
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

    case OFF:
      Object.assign(state, defaultState);

      return state;
    case RESULT:
      if (!state.operator) {
        return state;
      }

      state.operandA = processBinaryOperation(state.operandA, state.operandB, state.operator);
      state.operandB = null;
      state.currentOperand = 'B';
      state.display = state.operandA;
      state.operator = null;

      return state;

    default:
      return oldState;
  }
}


function processBinaryOperation(a, b, operator) {
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

function processOperation(x, operator) {
  switch (operator) {
    case 'sign':
      return x * -1;

    case 'sqrt':
      return Math.sqrt(x);
  }
}

function processNumber(x, number) {
  return x === null ? number : x * 10 + number;
}
