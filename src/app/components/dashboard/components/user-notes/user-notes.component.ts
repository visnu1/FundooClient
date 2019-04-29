import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from "../../../../services/data-service/data.service";
import { MatDialog } from '@angular/material';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { NoteService } from 'src/app/services/service/note.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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

  d: Date = new Date();
  d0 = new Date(this.d.getFullYear(), this.d.getMonth(), (this.d.getDate() - 1));
  d1 = new Date(this.d.getFullYear(), this.d.getMonth(), (this.d.getDate() + 1));

  @Input() getCards;

  @Output() actionOne = new EventEmitter;
  @Output() trashAction = new EventEmitter;
  @Output() archiveAction = new EventEmitter;


  constructor(private data: DataService, private matdailog: MatDialog, private service: NoteService) {
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => {
      this.viewType = message;
    })
  }

  movies = [
    {
      title: "hello",
      description: "working3"
    },
    {
      title: "hello1",
      description: "working2"
    },
    {
      title: "hello2",
      description: "working1"
    }
  ]

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

  archiveCall() {
    this.archiveAction.emit();
  }

  // drop(event: CdkDragDrop<{
  //   archive: boolean
  //   color: string
  //   createdAt: string
  //   description: string
  //   pinned: boolean
  //   title: string
  //   trash: boolean
  //   updatedAt: string
  //   userId: string
  //   __v: number
  //   _id: string
  // }[]>) {
  //   moveItemInArray(this.getCards.cards, event.previousIndex, event.currentIndex);
  // }

}
