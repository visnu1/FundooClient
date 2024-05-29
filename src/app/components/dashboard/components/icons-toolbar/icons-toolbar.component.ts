import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, DoCheck, } from '@angular/core';
import { Router } from '@angular/router';
import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { OnDestroy, AfterViewInit, ElementRef, ViewChild, ChangeDetectorRef, NgZone } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { NoteService } from '../../../../services/service/note.service';
import { DataService } from '../../../../services/data-service/data.service';
import { Note, NoteLabel } from '../../../../Models/note';
import { Observable, Subscription } from 'rxjs';



@Component({
  selector: 'app-icons-toolbar',
  templateUrl: './icons-toolbar.component.html',
  styleUrls: ['./icons-toolbar.component.scss'],
  // host: {
  //   '(document:click)': 'onClick($event)',
  // },
  encapsulation: ViewEncapsulation.None
})
export class IconsToolbarComponent implements OnInit {
  pLabels: string[] = [];
  dLabels: string[] = [];

  constructor(
    private service: NoteService,
    private router: Router,
    public dataService: DataService,
    private _eref: ElementRef) {
  }


  date = new FormControl(new Date());
  time = new FormControl('Set time', Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/));
  // timeArray: any[];


  period = new FormControl('Does not repeat');
  pdt: boolean = false;

  pop: boolean = false;
  url: boolean = true;
  archiveIco = true;


  //To hide the icon
  @Input() undo: boolean;
  //To recieve the card details from the user notes on which the user poke
  @Input() card: Note | any

  // @Input() upDateCard

  @Output() archiveCard = new EventEmitter();
  @Output() colorCard = new EventEmitter();
  //for archive old card and trash card
  @Output() action = new EventEmitter();
  //for delete forever and restore
  @Output() trashact = new EventEmitter();
  @Output() archiveAct = new EventEmitter();
  @Output() reminderCard = new EventEmitter();
  @Output() menuClosed = new EventEmitter();

  colorbox = [
    { color: "#fff", title: "Default" },
    { color: "#f28b82", title: "Red" },
    { color: "#fbbc04", title: "Orange" },
    { color: "#fff475", title: "Yellow" },
    { color: "#ccff90", title: "Green" },
    { color: "#a7ffeb", title: "Teel" },
    { color: "#cbf0f8", title: "Blue" },
    { color: "#aecbfa", title: "Dark blue" },
    { color: "#d7aefb", title: "Purple" },
    { color: "#fdcfe8", title: "Pink" },
    { color: "#e6c9a8", title: "Brown" },
    { color: "#e0e0e0", title: "Gray" }
  ]

  ngOnInit() {
    if (this.router.url == '/dashboard/trash') {
      this.url = false;
    }
    if (this.router.url == '/dashboard/archive') {
      this.archiveIco = false;
    }
    document.body.click();
  }


  public get labels(): any[] {
    const noteLbs = this.card?.labels || [];
    return this.dataService.labels.map((label: NoteLabel) => ({
      ...label,
      active: noteLbs.some((noteLabel: NoteLabel) => noteLabel._id == label._id)
    }));
  }

  more() {
    this.pop = !this.pop;
  }


  color(colorObj, card) {
    console.log(colorObj.color);
    console.log(card);
    // card.color=colorObj.color;
    if (card == undefined) {
      this.colorCard.emit(colorObj.color);
    } else {
      card.color = colorObj.color;
      this.updateColour(colorObj.color, card);
    }
  }

  updateColour(color: string, card: Note): void {
    const obj = {
      "cardId": card._id,
      "color": color
    }
    this.service.updateNote(obj).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }

  archive(card: Note): void {
    if (card == undefined) {
      //take a note event emitter
      this.archiveCard.emit(true);
      return;
    }
    const obj = {
      "cardId": card._id,
      "archive": !card.archive,
    }
    this.service.updateNote(obj).subscribe({
      next: (v) => {
        console.log(v);
        this.action.emit();
        this.archiveAct.emit();
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  trash(card: Note): void {
    const obj = {
      "cardId": card._id,
      "trash": true,
    }
    this.service.updateNote(obj).subscribe({
      next: (v) => {
        console.log(v);
        this.action.emit();
        this.archiveAct.emit();
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  restore(card: Note): void {
    const obj = {
      "cardId": card._id,
      "trash": false
    }
    this.service.updateNote(obj).subscribe({
      next: (v) => {
        console.log(v);
        this.trashact.emit(card);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }

  delete(card: Note): void {
    const obj = {
      "cardId": card._id
    }
    this.service.deleteService(obj).subscribe({
      next: (v) => {
        console.log(v);
        this.trashact.emit(card);
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    });
  }


  setReminder(card, when) {

    let d: Date = new Date();
    let date;
    if (when.toLowerCase().trim() == 'today') {
      date = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 20);
    } else if (when.toLowerCase().trim() == 'tommorow') {
      date = new Date(d.getFullYear(), d.getMonth(), (d.getDate() + 1), 8);
    } else if (when.toLowerCase().trim() == 'mon') {
      date = new Date(d.getFullYear(), d.getMonth(), (d.getDate() + 7), 8);
    }
    this.reminderService(card, date);
  }


  customReminder(card) {
    if (this.time.hasError('pattern')) {
      return
    }
    else {
      var d = new Date(this.date.value);
      d.setHours(parseInt(this.time.value.substr(0, 2)));
      d.setMinutes(parseInt(this.time.value.substr(3)));
      d.setSeconds(0);
      d.setMilliseconds(0);
      this.reminderService(card, d);
    }
  }

  reminderService(card: Note, date: any = '') {
    if (card == undefined) {
      this.reminderCard.emit(date.toISOString());
      return;
    }
    card.reminder = date;
    const obj = {
      cardId: card._id,
      reminder: date
    }

    this.service.updateNote(obj).subscribe({
      next: (v) => {
        console.log(v);
        this.action.emit();
        this.archiveAct.emit();
      },
      error: (e) => console.error('Unable to set reminder:', e),
      complete: () => console.info('complete')
    });
  }

  async onAdd(l: any) {
    const active: boolean = l['active'];
    if (active) {
      const label = this.card.labels.filter((lbl: NoteLabel) => lbl._id == l._id).pop();
      this.service.removeNoteLabel({ cardId: this.card._id, labelId: label._id }).subscribe({
        next: () => l['active'] = false
      });
      return;
    }
    this.card.labels.unshift(l);
    this.service.addNoteLabel({ cardId: this.card._id, labelId: l._id }).subscribe({
      next: () => l['active'] = true
    });
    this.dataService.updateNote(this.card);
  }

  isClosed(card) {
    // if (this.pLabels.length > 0) {
    //   let data = {
    //     cardId: card._id,
    //     plabels: this.pLabels
    //   }
    //   this.service.patchLabels(data).subscribe(result => {
    //     console.log(result);
    //     this.pLabels = [];
    //   });
    // }
    // if (this.dLabels.length > 0) {
    //   let data = {
    //     cardId: card._id,
    //     dlabels: this.dLabels
    //   }
    //   this.service.chipLabels(data).subscribe(result => {
    //     console.log(result);
    //     this.dLabels = [];
    //   });
    // }
  }
}