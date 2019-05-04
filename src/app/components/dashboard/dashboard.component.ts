import { Component, OnInit, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DataService } from "../../services/data-service/data.service";
import { MatDialog } from '@angular/material';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { NoteService } from 'src/app/services/service/note.service';
import { MessagingService } from '../../services/shared/messaging.service';
import { LabelsComponent } from './components/labels/labels.component';


export interface LabelData {
  labels: string[],
  addLabels: string[],
  deleteLabels: string[],
  renameLabels: any[]
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  view: string = "listico";
  viewType: boolean = false;
  userAvatar: string;
  message
  labels: string[] = [];
  aLabels: string[] = [];
  dLabels: string[] = [];
  rLabels: any[] = [];

  @Input() email: string;
  @Input() name: string;
  @Input() userid: string;
  @Input() token: string;
  @Input() style: string;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private router: Router,
    private data: DataService,
    private matDailog: MatDialog,
    private service: NoteService,
    private breakpointObserver: BreakpointObserver,
    private messagingService: MessagingService,
    private matdailog: MatDialog) {

    this.email = localStorage.getItem('email');
    this.name = localStorage.getItem('name');
    this.userid = localStorage.getItem('userid');
    this.token = localStorage.getItem('token');
    this.data.onTokenInitialize(this.token);
    this.data.onUserIdInitialize(this.userid);
    this.getLabels();
    // localStorage.clear();
  }

  ngOnInit() {
    // this.messagingService.requestPermission()
    // this.messagingService.receiveMessage()
    // this.message = this.messagingService.currentMessage
  }


  getLabels() {
    this.service.getLabels().subscribe((result: string[]) => {
      this.labels = result;
      this.data.onSetLabels(result);
    }, err => {
      console.error(err);
    })
  }

  addLabels() {
    let data = {
      labelArr: this.aLabels
    }
    this.service.addLabels(data).subscribe(result => {
      console.log(result);
    }, err => {
      console.error(err);
    })
  }

  deleteLabels() {
    let data = {
      labelArr: this.dLabels
    }
    this.service.deleteLabels(data).subscribe(result => {
      console.log(result);
    }, err => {
      console.error(err);
    })
  }

  renameLabels() {

    // this.service.renameLabels(data).subscribe(result => {
    //   console.log(result);
    // }, err => {
    //   console.error(err);
    // })
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

  file() {
    const dialogBox = this.matDailog.open(ImageUploadComponent);
    dialogBox.afterClosed().subscribe(data => {
      if (data == undefined) {
        return;
      } else {
        var formData = new FormData();
        formData.append('image', data);
        this.service.userProfile(formData).subscribe(result => {
          console.log("Image has been updated");
          console.log(result);
          this.userAvatar = result['profile'];

        },
          error => {
            console.warn("Unable to save into the server");
            console.error(error);
          })
      }
    })
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

  editLabels() {
    let temp: LabelData = {
      labels: this.labels,
      addLabels: this.aLabels,
      deleteLabels: this.dLabels,
      renameLabels: this.rLabels
    }
    const dialogBox = this.matdailog.open(LabelsComponent, {
      data: temp
    })
    dialogBox.afterClosed().subscribe(data => {
      if (this.aLabels.length > 0) {
        this.addLabels();
      }
      if (this.dLabels.length > 0) {
        this.deleteLabels();
      }
      if (this.rLabels.length > 0) {
        this.renameLabels();
      }
    });
  }
}
