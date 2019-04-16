import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../user-notes/user-notes.component';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {

  }

  title() {
    this.data['title'] = document.getElementById('title').innerText;
  }

  description() {

  }

}

// constructor( public dialogRef: MatDialogRef<UserNotesComponent>,
//   @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
