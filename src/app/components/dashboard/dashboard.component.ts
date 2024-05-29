import { Component, OnInit, ViewEncapsulation, Input, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from "../../services/data-service/data.service";
import { MatDialog } from '@angular/material/dialog';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { EditLabelsComponent } from './components/edit-labels/edit-labels.component';
import { NoteService } from '../../services/service/note.service';
import { NoteLabel } from '../../Models/note';


export interface LabelData {
  labels: any[],
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
  labels: any[];

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
    public router: Router,
    private dataService: DataService,
    private matDailog: MatDialog,
    private service: NoteService,
    private breakpointObserver: BreakpointObserver,
    private matdailog: MatDialog,
    private route: ActivatedRoute) {
    this.email = localStorage.getItem('email');
    this.name = localStorage.getItem('name');
    this.userid = localStorage.getItem('userid');
    this.token = localStorage.getItem('token');
    this.dataService.onTokenInitialize(this.token);
    this.dataService.onUserIdInitialize(this.userid);
    // localStorage.clear();
  }



  public get usernameFirstLetter(): string {
    return this.name.substring(0, 1).toUpperCase();
  }


  async ngOnInit() {
    this.service.fetchLabels();
    this.dataService.labels$.subscribe((labels: NoteLabel[]) => {
      this.labels = labels;
    });
  }


  //To change the note style view
  onViewChange() {
    if (this.viewType) {
      this.view = "listico";
    } else {
      this.view = "gridico";
    }
    this.viewType = !this.viewType;
    this.dataService.onViewChange(this.viewType);

  }

  file() {
    const dialogBox = this.matDailog.open(ImageUploadComponent);
    dialogBox.afterClosed().subscribe(data => {
      if (!data) return;
      const formData = new FormData();
      formData.append('image', data);
      this.service.userProfile(formData).subscribe({
        next: (result) => {
          console.log("Image has been updated");
          console.log(result);
          this.userAvatar = result['profile'];
        },
        error: (error) => {
          console.warn("Unable to save into the server");
          console.error(error);
        }
      })
    })
  }

  onSignOut() {
    localStorage.clear();
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

  labelsPage(l) {
    this.router.navigate(['dashboard/labels', l]);
    this.dataService.onEmitCurrentLabel(l);
  }


  editLabels() {
    this.matdailog.open(EditLabelsComponent, { data: this.labels });
  }


  refresh() {
  }
}
