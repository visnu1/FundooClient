import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from "../../../../services/data-service/data.service";
import { MatDialog } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { NoteService } from 'src/app/services/service/note.service';

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

  @Output() actionOne = new EventEmitter;

  @Output() trashAction = new EventEmitter;


  constructor(private data: DataService, private matdailog: MatDialog, private service: NoteService) {
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => {
      this.viewType = message;
    })
  }

  updateNote(card) {
    const dialogBox = this.matdailog.open(UpdateNoteComponent, {
      data: card
    });
    dialogBox.afterClosed().subscribe(result => {
      if (result == undefined) {
        console.log("woking undefined");
        return;
      }
      else if (result == "archive") {
        this.actionOne.emit();
      } else {
        const body = {
          cardId: result._id,
          title: result.title,
          description: result.description
        }
        this.service.updateNote(body).subscribe(data => {
          console.log("card updated");
          this.actionOne.emit();
        }, error => {
          console.error("unable to update card:", error);
        });
      }
    });
  }

  noteCall() {
    this.actionOne.emit();
  }

  trashCall() {
    this.trashAction.emit();
  }

}
