import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  email: string;
  name: string;
  userid: string;


  constructor(private router: Router) {
    this.email = localStorage.getItem('email');
    this.name = localStorage.getItem('name');
    this.userid = localStorage.getItem('userid');
    // localStorage.clear();
  }

  ngOnInit() {
  }



  refresh() {

  }

  signIn() {
    // localStorage.clear();
    this.router.navigate(['signin']);
  }

}
