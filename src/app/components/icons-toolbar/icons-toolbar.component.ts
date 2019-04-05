import { Component, OnInit } from '@angular/core';
import { TakeNoteComponent } from '../take-note/take-note.component';


@Component({
  selector: 'app-icons-toolbar',
  templateUrl: './icons-toolbar.component.html',
  styleUrls: ['./icons-toolbar.component.scss']
})
export class IconsToolbarComponent implements OnInit {

  constructor(private note: TakeNoteComponent) {
  }

  ngOnInit() {
  }

  close() {
    this.note.send();
    this.note.click();
  }
}
