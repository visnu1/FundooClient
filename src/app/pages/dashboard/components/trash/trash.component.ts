import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../../../core/services/note/note.service';
import { DataService } from '../../../../core/services/data-service/data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenericDialogComponent } from '../../../../core/shared/dialogs/generic-dialog/generic-dialog.component';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  trashCards = {
    cards: [] as any[],
    gridCards1: [] as any[],
    gridCards2: [] as any[],
    gridCards3: [] as any[]
  };
  emptyTrash = true;

  constructor(
    private noteService: NoteService,
    private dataService: DataService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadCards();
  }

  // Fetch notes and segregate them
  async loadCards(): Promise<void> {
    try {
      const notes = await this.noteService.getNotes(this.dataService.token).toPromise();
      this.segregateNotes(notes?.result || []);
    } catch (error) {
      console.error('Failed to load notes:', error);
    }
  }

  // Segregate notes into columns
  segregateNotes(notes: any[]): void {
    const trashNotes = notes.filter(note => note.trash);
    this.emptyTrash = trashNotes.length === 0;
    if (this.emptyTrash) return;
    this.trashCards.cards = [...trashNotes];
    this.divideIntoColumns(trashNotes);
  }

  // Divide notes into three grid columns
  divideIntoColumns(notes: any[]): void {
    const columnCount = 3;
    const columns = [[], [], []];  // Initialize columns

    notes.forEach((note, index) => {
      const columnIndex = index % columnCount;
      columns[columnIndex].push(note);
    });

    // Assign the divided columns
    [this.trashCards.gridCards1, this.trashCards.gridCards2, this.trashCards.gridCards3] = columns;
  }

  // Handle restore and refresh
  handleUserAction(): void {
    // Re-load the notes after restore or delete action
    this.ngOnInit();
  }

  // Delete all notes in trash permanently
  async deleteAllNotes(): Promise<void> {
    try {
      await lastValueFrom(this.noteService.trashNotes());
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
