import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/service/user.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  cards = [];

  constructor(private service: UserService, private dashboard: DashboardComponent) { }

  ngOnInit() {
    this.getCards();
  }

  getCards() {
    //console.log(this.dashboard.token);
    this.service.getNotes(this.dashboard.token).subscribe(data => {
      this.segregate(data['result']);
      // console.log(this.cards);
    })
  }

  segregate(data) {
    let temp = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].trash == false && data[i].archive == false) {
        temp.push(data[i]);
      }
    }
    this.cards = temp.reverse();
  }

  userinteract() {
    this.ngOnInit();
  }
}
