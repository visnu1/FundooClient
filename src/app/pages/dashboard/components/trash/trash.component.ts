import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../../../core/services/note/note.service';
import { DataService } from '../../../../core/services/data-service/data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from '../../../../core/shared/dialogs/generic-dialog/generic-dialog.component';
import { filter, lastValueFrom, map } from 'rxjs';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  trashedNotes = [];
  emptyTrash = true;

  constructor(
    private _noteService: NoteService,
    private _dataService: DataService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.onLoadNotes();
  }

  onLoadNotes() {
    this._noteService.getNotes(this._dataService.token)
      .pipe(
        map((data) => {
          const result = Array.isArray(data?.result)
            ? data.result.filter(({ trash }) => trash)
            : [];
          return { ...data, result };
        })
      )
      .subscribe({
        next: ({ result }) => {
          this.emptyTrash = result.length === 0;
          this.trashedNotes = result;
        },
        error: (e) => console.warn(e)
      })
  }

  // Handle restore and refresh
  handleUserAction(): void {
    // Re-load the notes after restore or delete action
    this.ngOnInit();
  }

  // Delete all notes in trash permanently
  async deleteAllNotes(): Promise<void> {
    try {
      await lastValueFrom(this._noteService.trashNotes());
      this.handleUserAction(); // Refresh after deleting
    } catch (error) {
      console.error('Failed to delete all notes:', error);
    }
  }

  onEmptyTrash(): void {
    this.dialog.open(GenericDialogComponent, {
      autoFocus: false, // Disable autofocus
      data: {
        message: 'Empty trash? All notes in Trash will be permanently deleted.',
        actionName: 'Empty'
      }
    }).afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteAllNotes();
      }
    });
  }
}
