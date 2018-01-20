import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { NUMBER, OPERATOR } from '../reducers';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';

export interface CalcState {
  operandA: number;
  operandB: number;
  currentOperand: string,
  operator: string;
  display: number;
}

interface AppState {
  calc: CalcState
}

@Component({
  selector: 'calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {
  number$ = new Subject().map((value) => ({ type: NUMBER, payload: Number(value) }));
  operator$ = new Subject().map((value) => ({ type: OPERATOR, payload: value }));

  display$;

  constructor(private store: Store<AppState>) {
    this.display$ = store.select<number>(state => { console.log(state.calc); return state.calc.display;});

    this.display$.subscribe(state => console.log(state));

    Observable.merge(this.number$, this.operator$)
      .subscribe((action) => {
        store.dispatch(action);
      });
  }

  ngOnInit() {
  }

}
