import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/service/user.service';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';


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
  userNoteMsg = true;
  hide: boolean = false;

  constructor(private service: UserService, private router: Router, public dashboard: DashboardComponent) {
  }

  ngOnInit() {
  }

  @Output() addingNote = new EventEmitter();

  send() {
    this.click();
    if (document.getElementById("asas").innerText != "" || document.getElementById("title").innerText != "") {
      // console.log(this.dashboard.userid);
      let body = {
        userId: this.dashboard.userid,
        title: document.getElementById("title").innerText,
        description: document.getElementById("asas").innerText,
        reminders: "",
        color: this.color,
        archive: this.archive,
        trash: this.trash,
        pinned: this.pinned
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
      return;
    }
  }

  click() {
    this.hide = !this.hide;
  }

  userArchive(event) {
    this.archive = event;
    this.send();
  }
}
