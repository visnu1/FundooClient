import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserService } from 'src/app/services/service/user.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  archiveCards: any[] = [];

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
      if (data[i].archive == true && data[i].trash == false) {
        temp.push(data[i]);
      }
    }
    this.archiveCards = temp.reverse();
  }
}
