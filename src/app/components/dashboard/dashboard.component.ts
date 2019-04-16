import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from "../../services/data-service/data.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  view: string = "listico";
  viewType: boolean = false;

  @Input() email: string;
  @Input() name: string;
  @Input() userid: string;
  @Input() token: string;
  @Input() style: string;


  constructor(private router: Router, private data: DataService) {

    this.email = localStorage.getItem('email');
    this.name = localStorage.getItem('name');
    this.userid = localStorage.getItem('userid');
    this.token = localStorage.getItem('token');
    this.data.onTokenInitialize(this.token);
    this.data.onUserIdInitialize(this.userid);
    // localStorage.clear();
  }

  ngOnInit() {
  }

  refresh() {
  }

  //To change the note style view
  onViewChange() {
    if (this.viewType) {
      this.view = "listico";
    } else {
      this.view = "gridico";
    }
    this.viewType = !this.viewType;
    this.data.onViewChange(this.viewType);

  }

  signIn() {
    // console.clear();
    // localStorage.clear();
    this.router.navigate(['signin']);
  }

  notes() {
    this.router.navigate(['dashboard/note']);
  }

  reminders() {
    this.router.navigate(['dashboard/reminders']);
  }

  archive() {
    this.router.navigate(['dashboard/archive']);
  }

  trash() {
    this.router.navigate(['dashboard/trash']);
  }
}
