import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.scss']
})
export class ScreenComponent implements OnInit {

  @Input() info: number;
  @Input() isMemoryEnabled: boolean;

  constructor() { }

  ngOnInit() {
  }
}
