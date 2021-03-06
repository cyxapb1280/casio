import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/merge';
import {KeyboardComponent} from '../keyboard/keyboard.component';

export interface CalcState {
  operandA: number;
  operandB: number;
  currentOperand: string;
  operator: string;
  display: number;
  enabled: boolean;
  floatMode: boolean;
  memory: number;
}

interface AppState {
  calc: CalcState;
}

@Component({
  selector: 'calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.scss']
})
export class CalcComponent implements OnInit, AfterViewInit {
  display$;
  memory$;

  @ViewChild(KeyboardComponent) keyboard;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.display$ = this.store.select<number>(state => {
      return state.calc.display;
    });

    this.memory$ = this.store.select<boolean>(state => {
      return state.calc.memory !== null;
    });
  }

  ngAfterViewInit() {
    this.keyboard.keyDown$
      .map(({ type, value }) => ({ type: type, payload: value }))
      .subscribe((action) => {
        this.store.dispatch(action);
      });
  }
}
