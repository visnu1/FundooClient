import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../../../../Models/note';
import { NoteService } from '../../../../services/service/note.service';

@Component({
  selector: '.app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {
  @Input() card!: Note;

  constructor(private _noteService: NoteService) { }

  ngOnInit(): void { }

  updatePin(state: boolean): void {
    const updatePayload = {
      cardId: this.card._id,
      pinned: state
    };

    this._noteService.updateNote(updatePayload).subscribe({
      next: () => {
        this.card['pinned'] = state;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }
}
