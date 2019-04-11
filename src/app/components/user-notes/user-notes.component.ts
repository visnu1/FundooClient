import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-notes',
  templateUrl: './user-notes.component.html',
  styleUrls: ['./user-notes.component.scss']
})
export class UserNotesComponent implements OnInit {

  userNoteMsg = false;
  @Input() getCards;

  @Output() action = new EventEmitter;

  @Output() trashAction = new EventEmitter;

  constructor() { }

  ngOnInit() {
  }

  noteCall() {
    this.action.emit();
  }

  trashCall() {
    this.trashAction.emit();
  }
}
