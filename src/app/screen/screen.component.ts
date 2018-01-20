import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements OnInit {

  @Input() info: number;

  constructor() { }

  ngOnInit() {
  }

}
