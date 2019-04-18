import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatCard } from '@angular/material';
import { DialogData, UserNotesComponent } from '../user-notes/user-notes.component';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {



  constructor(public dialogRef: MatDialogRef<UserNotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {

  }

  save(event) {
    if (event.path[0].outerHTML.includes("archive")) {
      this.dialogRef.close("archive");
    }
  }
}

