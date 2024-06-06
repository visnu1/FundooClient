import { Component, OnInit, Inject } from '@angular/core';

import { DashboardComponent } from '../../dashboard.component';
import { DialogData } from '../user-notes/user-notes.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
//to select and drop files

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})



export class ImageUploadComponent implements OnInit {

  imgData: any
  imgDisplay: string = "inactive"
  butDisplay: string = "activee"
  button: boolean = true;
  croppedImg: any

  constructor(public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  fileAdded(event) {
    this.imgData = event
    this.butDisplay = "inactive";
    this.imgDisplay = "activee";
    this.button = false;
  }

  imageCropped(event) {
    const file = new File([event.blob], 'user-profile', { type: 'image/png' })
    this.croppedImg = file;
  }

  submit() {
    this.dialogRef.close(this.croppedImg);
  }

  close() {
    this.dialogRef.close();
  }
}
