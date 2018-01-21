import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { NUMBER, BINARY_OPERATOR, OPERATOR } from '../reducers';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import { KEYS } from './keys';

export interface CalcState {
  operandA: number;
  operandB: number;
  currentOperand: string;
  operator: string;
  display: number;
  enabled: boolean;
}

interface AppState {
  calc: CalcState;
}

@Component({
  selector: 'calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent implements OnInit {
  firstSectionKeys = KEYS.slice(0, 2);
  mainSectionKeys = KEYS.slice(2, 17);
  lastSectionKeys = KEYS.slice(17, 25);
  tallKey = KEYS[KEYS.length - 1];

  keyDown$ = new Subject()
    .map(({ type, value }) => ({ type: type, payload: value }));

  display$;

  constructor(private store: Store<AppState>) {
    this.display$ = store.select<number>(state => {
      console.log(state.calc);
      return state.calc.display;
    });

    this.keyDown$.subscribe((action) => {
      store.dispatch(action);
    });
  }

  ngOnInit() {
  }
}
