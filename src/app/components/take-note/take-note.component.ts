import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/service/user.service';
import { Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';


@Component({
  selector: 'app-take-note',
  templateUrl: './take-note.component.html',
  styleUrls: ['./take-note.component.scss'],
})


export class TakeNoteComponent implements OnInit {

  hide: boolean = false;
  response: any;

  constructor(private service: UserService, private router: Router, public dashboard: DashboardComponent) {
  }

  ngOnInit() {
  }


  send() {
    if (document.getElementById("asas").innerText != "" || document.getElementById("title").innerText != "") {
      console.log(this.dashboard.userid);
      let body = {
        userId: this.dashboard.userid,
        title: document.getElementById("title").innerText,
        description: document.getElementById("asas").innerText
      }
      this.service.createNote(body).subscribe(data => {
        this.response = data;
        console.log(this.response);

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
}
