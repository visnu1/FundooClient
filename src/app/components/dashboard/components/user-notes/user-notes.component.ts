import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from "../../../../services/data-service/data.service";
import { MatDialog } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';

export interface DialogData {
  data: string;
}

@Component({
  selector: 'app-user-notes',
  templateUrl: './user-notes.component.html',
  styleUrls: ['./user-notes.component.scss']
})
export class UserNotesComponent implements OnInit {


  //to send the data for undo icon
  userNoteMsg = false;
  viewType: boolean;

  @Input() getCards;

  @Output() action = new EventEmitter;

  @Output() trashAction = new EventEmitter;


  constructor(private data: DataService, private matdailog: MatDialog) {
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => {
      this.viewType = message;
    })
  }

  updateNote(card) {
    const dialogBox = this.matdailog.open(UpdateNoteComponent, {
      data: card
    })
    dialogBox.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  noteCall() {
    this.action.emit();
  }

  trashCall() {
    this.trashAction.emit();
  }

}
