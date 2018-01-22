import {Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {KEYS} from './keys';

@Component({
  selector: 'keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  firstSectionKeys = KEYS.slice(0, 2);
  mainSectionKeys = KEYS.slice(2, 17);
  lastSectionKeys = KEYS.slice(17, 25);
  tallKey = KEYS[KEYS.length - 1];

  keyDown$ = new Subject();

  constructor() {
  }

  ngOnInit() {

  }

}
