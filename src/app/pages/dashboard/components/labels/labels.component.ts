import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { NoteService } from '../../../../core/services/note/note.service';
import { DataService } from '../../../../core/services/data-service/data.service';
import { filter, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.scss']
})
export class LabelsComponent implements OnInit {

  labelNotes = [];
  labelId!: string;

  constructor(
    private _noteService: NoteService,
    private _dataService: DataService,
    private _cdr: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute
  ) { }


  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.labelId = queryParams['id'];
      this.onLoadNotes();
    })
  }


  onLoadNotes() {
    this._noteService.getNotes()
      .pipe(
        map((data) => {
          const result = Array.isArray(data?.result)
            ? data.result.filter(({ archive, trash, labels }) => trash === false && archive === false && labels.some(label => label._id == this.labelId))
            : [];
          return { ...data, result };
        })
      )
      .subscribe({
        next: ({ result }) => {
          this.labelNotes = result; console.log(result);
          this._cdr.detectChanges();
        },
        error: (e) => console.warn(e)
      })
  }

}
