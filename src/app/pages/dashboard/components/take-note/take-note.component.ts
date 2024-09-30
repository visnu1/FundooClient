import { Component, OnInit, Output, EventEmitter, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { NoteService } from '../../../../core/services/note/note.service';
import { DataService } from '../../../../core/services/data-service/data.service';


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
  hide: boolean = false;
  labels: string[] = [];
  noteType = 'plain';

  constructor(
    private service: NoteService,
    private router: Router,
    private data: DataService) { }

  ngOnInit() {
  }

  @Output() addingNote = new EventEmitter();

  send() {
    this.toggleNotes();
    if (document.getElementById("asas").innerText != "" || document.getElementById("title").innerText != "") {
      // console.log(this.data.userid);
      let body = {
        userId: this.data.userId,
        title: document.getElementById("title").innerText,
        description: document.getElementById("asas").innerText,
        reminder: this.rem,
        color: this.color,
        archive: this.archive,
        trash: this.trash,
        pinned: this.pinned,
        labels: this.labels,
        noteType: this.noteType
      }
      this.service.createNote(body).subscribe(data => {
        console.log(data);
        this.addingNote.emit();
      }, errors => {
        if (errors.status == 500) {
          console.error(errors.error.message + '\n\t' + errors.error.result);

        } else if (errors.status == 422) {
          console.warn("Invalid inputs ");
        }
        else {
          console.error(errors);
        }
      })
    } else {
      this.color = "#fff";
      return;
    }
    this.color = "#fff";;
  }

  onNewNoteList() {
    this.noteType = 'list';
    this.toggleNotes();
    
  }

  toggleNotes() {
    this.hide = !this.hide;
  }

  userArchive(event) {
    this.archive = event;
    this.send();
  }

  noteColor(color) {
    this.color = color
  }

  reminder(date) {
    this.rem = date;
  }
}
