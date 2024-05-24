import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Note } from '../../../../Models/note';
import { isValidDate } from '../../../../utils/date-utils';
import { NoteService } from '../../../../services/service/note.service';

@Component({
  selector: 'app-note-labels',
  templateUrl: './note-labels.component.html',
  styleUrl: './note-labels.component.scss',
  providers: [DatePipe]
})
export class NoteLabelsComponent {

  @Input() card: Note;
  labels = [];

  constructor(
    private _datePipe: DatePipe,
    private _service: NoteService
  ) { }


  ngOnInit(): void {
    this.processReminder();
    this.card.labels.map(name => this.labels.push({ name, reminder: false }));
  }


  processReminder() {
    const reminder = new Date(this.card.reminder);

    if (!isValidDate(reminder)) {
      return;
    }

    let name: string;

    const d = new Date();
    const today = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const yDay = new Date(d.getFullYear(), d.getMonth(), (d.getDate() - 1)).getTime();
    const tmrw = new Date(d.getFullYear(), d.getMonth(), (d.getDate() + 1)).getTime();
    const normalizedReminder = new Date(reminder.getFullYear(), reminder.getMonth(), reminder.getDate()).getTime();


    if (normalizedReminder === today) name = `Today, ${this._datePipe.transform(reminder, 'h:mm a')}`;
    else if (normalizedReminder === yDay) name = `Yesterday, ${this._datePipe.transform(reminder, 'h:mm a')}`;
    else if (normalizedReminder === tmrw) name = `Tommorow, ${this._datePipe.transform(reminder, 'h:mm a')}`;
    else name = this._datePipe.transform(reminder, 'MMMM d, h:mm a');

    this.labels.unshift({ name, reminder: true });
  }


  removeLabel(card: Note, label: any, reminder = false): void {
    const obj = {
      cardId: card._id
    }

    if (reminder)
      obj['reminder'] = null;
    else
      obj['label'] = label._id;


    this._service.removeNoteLabel(obj).subscribe({
      next: (v) => {
        console.log(v);
      },
      error: (e) => console.error('Unable to set reminder:', e),
      complete: () => console.info('complete')
    });
  }

}
