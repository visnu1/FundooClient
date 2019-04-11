import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserService } from 'src/app/services/service/user.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  trashCards: any[] = [];

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
      if (data[i].trash == true) {
        temp.push(data[i]);
      }
    }
    this.trashCards = temp.reverse();
  }

  // delete note forever and restore
  userRes() {
    this.ngOnInit();
  }
}
