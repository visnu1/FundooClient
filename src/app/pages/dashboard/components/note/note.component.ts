import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../../../core/services/note/note.service';
import { DataService } from '../../../../core/services/data-service/data.service';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  notes = [];

  constructor(
    private _noteService: NoteService,
    private _dataService: DataService
  ) { }

  ngOnInit() {
    this.onLoadNotes();
  }

  onLoadNotes() {
    this._noteService.getNotes(this._dataService.token)
      .pipe(
        map((data) => {
          const result = Array.isArray(data?.result)
            ? data.result.filter(({ archive, trash }) => trash === false && archive === false)
            : [];
          return { ...data, result };
        })
      )
      .subscribe({
        next: ({ result }) => this.notes = result,
        error: (e) => console.warn(e)
      })
  }

}
