import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../../../core/services/note/note.service';
import { DataService } from '../../../../core/services/data-service/data.service';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-reminders',
  templateUrl: './reminders.component.html',
  styleUrls: ['./reminders.component.scss']
})
export class RemindersComponent implements OnInit {


  reminderNotes = [];
  emptyReminders = true;
  private refreshPage$: Subscription;

  constructor(
    private _noteService: NoteService,
    private _dataService: DataService
  ) { }

  ngOnInit() {
    this.onLoadReminders();
    this.refreshPageEvent();
  }

  refreshPageEvent() {
    this.refreshPage$ = this._dataService.pageRefresh.subscribe(_ => this.onLoadReminders());
  }

  onLoadReminders() {
    this._noteService.getNotes(this._dataService.token)
      .pipe(
        map((data) => {
          const result = Array.isArray(data?.result)
            ? data.result.filter(({ reminder, trash }) => trash === false && reminder != '')
            : [];
          return { ...data, result };
        })
      )
      .subscribe({
        next: ({ result }) => {
          this.emptyReminders = result.length === 0;
          this.reminderNotes = result;
        }
      })
  }

  ngOnDestroy(): void {
    if (this.refreshPage$)
      this.refreshPage$.unsubscribe();
  }

}
