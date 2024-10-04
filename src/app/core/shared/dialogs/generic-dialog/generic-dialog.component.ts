import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrl: './generic-dialog.component.scss'
})
export class GenericDialogComponent {

  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<GenericDialogComponent>)

  onAction() {
    this.dialogRef.close(true);
  }

}
