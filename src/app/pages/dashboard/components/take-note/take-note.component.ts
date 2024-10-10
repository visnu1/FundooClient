import { Component, OnInit, Output, EventEmitter, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { NoteService } from '../../../../core/services/note/note.service';
import { DataService } from '../../../../core/services/data-service/data.service';
import { Note } from '../../../../core/Models/note';


@Component({
  selector: 'app-take-note',
  templateUrl: './take-note.component.html',
  styleUrls: ['./take-note.component.scss'],
})


export class TakeNoteComponent implements OnInit {

  color: string = "#fff";
  archive: boolean = false;
  trash: boolean = false;
  pinned: boolean = false;
  rem: any = "";
  userNoteMsg = true;
  hidden = true;
  labels: string[] = [];

  @ViewChild('noteTitle') noteTitle!: ElementRef;
  @ViewChild('listNote') listNote!: ElementRef;
  @ViewChild('plainNote') userNotes!: ElementRef;

  @Output() addingNote = new EventEmitter();

  noteType: 'plain' | 'list' = 'plain';
  prevCheckListIpList;

  constructor(
    private _noteService: NoteService,
    private _dataService: DataService,
    private renderer: Renderer2
  ) { }

  ngOnInit() { }


  toggleNotes() {
    this.hidden = !this.hidden;
  }

  newListNote() {
    this.noteType = 'list';
    this.toggleNotes();
    if (!this.hidden)
      setTimeout(() => this.createTodoFormFld(), 50);
  }

  setDefaults() {
    this.noteType = 'plain';
    this.color = "#fff";
    this.hidden = true;
  }


  onSend() {

    if (this.noteType == 'list') this.extractTodoItems();

    const noteTitle = this.noteTitle.nativeElement.innerText || "";
    const userNotes = this.userNotes.nativeElement.innerText || "";

    if (!(noteTitle != "" || userNotes != "")) {
      this.setDefaults();
      return;
    }

    const note: Note = {
      userId: this._dataService.userId,
      title: noteTitle,
      description: userNotes,
      reminder: this.rem,
      color: this.color,
      archive: this.archive,
      trash: this.trash,
      pinned: this.pinned,
      labels: this.labels,
      noteType: this.noteType,
    }

    this._noteService.createNote(note, this._dataService.token).subscribe({
      next: (data) => this.addingNote.emit(),
      error: (e) => {
        if (e.status == 500)
          console.error(e.error.message + '\n\t' + e.error.result);
        else if (e.status == 422)
          console.warn("Invalid inputs ");
        else
          console.error(e);
      },
      complete: () => this.setDefaults()
    });
  }

  extractTodoItems() {
    // needs implementation
  }

  createTodoFormFld() {
    // Cleanup previous listeners
    if (this.prevCheckListIpList)
      this.prevCheckListIpList();

    const frmCtn = this.renderer.createElement('div');
    const frm = this.renderer.createElement('div');

    this.renderer.addClass(frmCtn, 'frm-ctn');
    this.renderer.addClass(frm, 'frm');
    this.renderer.setAttribute(frm, 'contenteditable', 'true');
    this.renderer.setAttribute(frm, 'aria-multiline', 'true');
    this.renderer.setAttribute(frm, 'tabindex', '0');

    this.renderer.setAttribute(frmCtn, 'data-complete', 'false');

    // Bind the input event and store the cleanup function
    this.prevCheckListIpList = this.renderer.listen(frm, 'input', (event) => this.onAddTodoItem(event));

    // Append elements
    this.renderer.appendChild(frmCtn, frm);
    this.renderer.appendChild(this.listNote.nativeElement, frmCtn);

    //focus
    // this.renderer.selectRootElement(frm).focus();
  }

  createTodoCtrls(parentEle: HTMLElement) {
    const checkBox = this.renderer.createElement('span');
    this.renderer.setAttribute(checkBox, 'class', 'material-symbols-outlined small-icon prefix-ico');
    this.renderer.setAttribute(checkBox, 'aria-checked', 'false');
    this.renderer.setAttribute(checkBox, 'role', 'checkbox');
    // this.renderer.setAttribute(checkBox, 'tabindex', '0');
    this.renderer.appendChild(checkBox, this.renderer.createText('check_box_outline_blank'));

    const closeIcon = this.renderer.createElement('span');
    this.renderer.setAttribute(closeIcon, 'class', 'material-symbols-outlined small-icon suffix-ico');
    // this.renderer.setAttribute(closeIcon, 'tabindex', '0');
    this.renderer.appendChild(closeIcon, this.renderer.createText('close'));

    this.renderer.appendChild(parentEle, checkBox);
    this.renderer.appendChild(parentEle, closeIcon);

    //add event listeners
    this.renderer.listen(closeIcon, 'click', ($event) => this.onRemoveTodoFld($event.target.parentElement));
    this.renderer.listen(checkBox, 'click', ($event) => this.onTodoCheckbox($event.target))
  }

  onAddTodoItem(event: Event): void {
    const target = (event.target as HTMLElement);
    this.createTodoCtrls(target.parentElement)
    this.createTodoFormFld();
  }

  onTodoCheckbox(checkbox: HTMLElement) {
    const parentEle = checkbox.parentElement;
    // Get the current 'data-complete' status as a boolean
    const isChecked = parentEle.getAttribute('data-complete') === 'true';

    this.renderer.setProperty(checkbox, 'innerText', isChecked ? 'check_box_outline_blank' : 'check_box');
    this.renderer.setAttribute(checkbox, 'aria-checked', isChecked ? 'false' : 'true');
    this.renderer.setAttribute(parentEle, 'data-complete', isChecked ? 'false' : 'true');
  }

  onRemoveTodoFld(parentEle: HTMLElement) {
    this.renderer.removeChild(this.listNote.nativeElement, parentEle);
  }

  userArchive(event) {
    this.archive = event;
    this.onSend();
  }

  noteColor(color) {
    this.color = color
  }

  reminder(date) {
    this.rem = date;
  }

}
