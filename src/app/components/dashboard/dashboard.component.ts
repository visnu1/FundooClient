import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  @Input() email: string;
  @Input() name: string;
  @Input() userid: string;
  @Input() token: string;
  @Input() style: string;

  constructor(private router: Router) {
    this.email = localStorage.getItem('email');
    this.name = localStorage.getItem('name');
    this.userid = localStorage.getItem('userid');
    this.token = localStorage.getItem('token');
    // localStorage.clear();
  }

  ngOnInit() {
  }



  refresh() {
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
