import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../../../core/services/note/note.service';
import { DataService } from '../../../../core/services/data-service/data.service';
import { filter, map } from 'rxjs';


@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  archiveCards = [];
  emptyArchive = true;

  constructor(
    private _noteService: NoteService, 
    private _dataService: DataService
  ) { }

  ngOnInit() {
    this.onLoadArchived();
  }


  onLoadArchived() {
    this._noteService.getNotes(this._dataService.token)
      .pipe(
        map((data) => {
          const result = Array.isArray(data?.result)
            ? data.result.filter(({ archive, trash }) => archive === true && trash === false)
            : [];
          return { ...data, result };
        })
      )
      .subscribe({
        next: ({ result }) => {
          this.emptyArchive = result.length === 0;
          this.archiveCards = result;
        },
        error: (e) => console.warn(e)
      })
  }

}
