import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../../../core/services/note/note.service';
import { DataService } from '../../../../core/services/data-service/data.service';
import { filter, map } from 'rxjs';


@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {

  labelNotes = [];
  label!: string;

  constructor(
    private _noteService: NoteService,
    private _dataService: DataService
  ) { }


  ngOnInit() {
    this._dataService.currentLabel.subscribe(name => {
      this.label = name;
      this.onLoadNotes();
    })
  }


  onLoadNotes() {
    this._noteService.getNotes(this._dataService.token)
      .pipe(
        map((data) => {
          const result = Array.isArray(data?.result)
            ? data.result.filter(({ archive, trash, labels }) => trash === false && archive === false && labels.includes(this.label))
            : [];
          return { ...data, result };
        })
      )
      .subscribe({
        next: ({ result }) => this.labelNotes = result,
        error: (e) => console.warn(e)
      })
  }

}
