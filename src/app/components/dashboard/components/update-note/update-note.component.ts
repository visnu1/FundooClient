import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData, UserNotesComponent } from '../user-notes/user-notes.component';



@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.component.html',
  styleUrls: ['./update-note.component.scss']
})
export class UpdateNoteComponent implements OnInit {

  

  d = new Date();
  d0 = new Date(this.d.getFullYear(), this.d.getMonth(), this.d.getDate() - 1);
  d1 = new Date(this.d.getFullYear(), this.d.getMonth(), this.d.getDate() + 1);

  constructor(
    public dialogRef: MatDialogRef<UserNotesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  updateTitle(event: Event): void {
    const target = event.target as HTMLElement;
    this.data['title'] = target.textContent || '';
  }

  updateDescription(event: Event): void {
    const target = event.target as HTMLElement;
    this.data['description'] = target.textContent || '';
  }

  save(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.outerHTML.includes('archive')) {
      this.dialogRef.close('archive');
    }
  }

  isSameDay(date1: Date, date2: Date): boolean {
    if (!date1 || !date2) return false;
    return date1.toDateString() === date2.toDateString();
  }

  isOutsideRange(date1: Date, date2: Date, targetDate: Date): boolean {
    if (!targetDate) return false;
    return targetDate < date1 || targetDate > date2;
  }

  removeReminder(): void {
    this.data['reminder'] = null;
  }
}
