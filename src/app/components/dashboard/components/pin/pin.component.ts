import { Component, OnInit, Input } from '@angular/core';
import { MatCard } from '@angular/material/card';

@Component({
  selector: '.app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {

  constructor() { }

  pin: boolean

  @Input() card;

  ngOnInit() {
  }

  pinned(card) {
    console.log(card);
  }

}
