import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'; import { DataService } from '../../../../core/services/data-service/data.service';
import { NoteService } from '../../../../core/services/note/note.service';
import { Note } from '../../../../core/Models/note';
export interface DialogData {
  color?: string;
  title?: string;
  description?: string;
  reminder?: Date;
  updatedAt?: Date;
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


  @Input({ required: true }) notes: Note[];

  @Output() actionOne = new EventEmitter;
  @Output() trashAction = new EventEmitter;
  @Output() archiveAction = new EventEmitter;


  constructor(
    private data: DataService,
    private matdailog: MatDialog,
    private service: NoteService,
  ) { }


  ngOnInit() {
    this.data.currentMessage.subscribe(message => {
      this.viewType = message;
    });
  }

  updateNote(card) {
    const dialogBox = this.matdailog.open(UpdateNoteComponent, {
      data: card
    });
    dialogBox.afterClosed().subscribe(result => {
      if (result == undefined) {
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

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.notes, event.previousIndex, event.currentIndex);
    let index;
    if (event.currentIndex == 0) {
      let frontIndex = this.notes[event.currentIndex + 1]['index'];
      index = frontIndex + 0.0001;
    } else if (event.currentIndex == this.notes.length - 1) {
      let prevIndex = this.notes[event.currentIndex - 1]['index']
      index = prevIndex - 0.0001;
    } else {
      let prevIndex = this.notes[event.currentIndex - 1]['index']
      let frontIndex = this.notes[event.currentIndex + 1]['index'];
      index = (prevIndex + frontIndex) / 2
    }
    this.notes[event.currentIndex]["index"] = index;
    let card = this.notes[event.currentIndex];
    let data = {
      cardId: card._id,
      index: card.index
    }
    this.service.updateIndex(data).subscribe(res => {
      console.log(res);
    });
  }


  remove() {
    alert("not implemented")
  }
}