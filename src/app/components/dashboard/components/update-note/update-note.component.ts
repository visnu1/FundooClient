import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';

import { DialogData, UserNotesComponent } from '../user-notes/user-notes.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {


  d: Date = new Date();
  d0 = new Date(this.d.getFullYear(), this.d.getMonth(), (this.d.getDate() - 1));
  d1 = new Date(this.d.getFullYear(), this.d.getMonth(), (this.d.getDate() + 1));


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

