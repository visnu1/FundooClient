import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';import { DataService } from '../../../../core/services/data-service/data.service';
import { NoteService } from '../../../../core/services/service/note.service';

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
    moveItemInArray(this.getCards.cards, event.previousIndex, event.currentIndex);
    let index;
    if (event.currentIndex == 0) {
      let frontIndex = this.getCards.cards[event.currentIndex + 1]['index'];
      index = frontIndex + 0.0001;
    } else if (event.currentIndex == this.getCards.cards.length - 1) {
      let prevIndex = this.getCards.cards[event.currentIndex - 1]['index']
      index = prevIndex - 0.0001;
    } else {
      let prevIndex = this.getCards.cards[event.currentIndex - 1]['index']
      let frontIndex = this.getCards.cards[event.currentIndex + 1]['index'];
      index = (prevIndex + frontIndex) / 2
    }
    this.getCards.cards[event.currentIndex]["index"] = index;
    let card = this.getCards.cards[event.currentIndex];
    let data = {
      cardId: card._id,
      index: card.index
    }
    this.service.updateIndex(data).subscribe(res => {
      console.log(res);
    });
  }


  remove(){
    alert("not implemented")
  }
}



  //error fall here tuple error

  // drop2(event: CdkDragDrop<any[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex);
  //   }
  // }


  // <div cdkDropList #gridList2="cdkDropList" [cdkDropListData]="getCards.gridCards2"
  // [cdkDropListConnectedTo]="[gridList1,gridList3]" class="example-list" (cdkDropListDropped)="drop2($event)">

  // <div class="gridele example-box" *ngFor='let card of getCards.gridCards2' [style.background-color]="card.color"
  //   cdkDrag>
