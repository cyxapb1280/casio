import {BINARY_OPERATOR, CLEAR, CLEAR_ALL, FLOAT, NUMBER, OFF, OPERATOR, PERCENT, RESULT} from '../reducers';

interface Key {
  label: string;
  value: string;
  type: string;
  isSpecial?: boolean;
  id?: string;
}

export const KEYS: Array<Key> = [
  { label: '&radic;', value: 'sqrt', type: OPERATOR },
  { label: 'OFF', value: 'off', type: OFF },
  { label: 'MC', value: 'mc', type: OPERATOR },
  { label: 'MR', value: 'mr', type: OPERATOR },
  { label: 'M-', value: 'mMinus', type: OPERATOR },
  { label: 'M+', value: 'mPlus', type: OPERATOR },
  { label: '&divide;', value: 'divide', type: BINARY_OPERATOR },
  { label: '&#37;', value: 'percent', type: PERCENT },
  { label: '7', value: '7', type: NUMBER },
  { label: '8', value: '8', type: NUMBER },
  { label: '9', value: '9', type: NUMBER },
  { label: '&times;', value: 'multiply', type: BINARY_OPERATOR },
  { label: '&plusmn;', value: 'sign', type: OPERATOR },
  { label: '4', value: '4', type: NUMBER },
  { label: '5', value: '5', type: NUMBER },
  { label: '6', value: '6', type: NUMBER },
  { label: '-', value: 'minus', type: BINARY_OPERATOR },
  { label: 'C', value: 'clear', type: CLEAR, isSpecial: true },
  { label: '1', value: '1', type: NUMBER },
  { label: '2', value: '2', type: NUMBER },
  { label: '3', value: '3', type: NUMBER },
  { label: 'AC', value: 'clearAll', type: CLEAR_ALL, isSpecial: true, id: 'clear-all' },
  { label: '0', value: '0', type: NUMBER },
  { label: '&middot;', value: '.', type: FLOAT },
  { label: '=', value: 'equal', type: RESULT },
  { label: '+', value: 'plus', type: BINARY_OPERATOR },
];
