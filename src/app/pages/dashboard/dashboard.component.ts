import { Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef, viewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, lastValueFrom } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { EditLabelsComponent } from './components/edit-labels/edit-labels.component';
import { NoteLabel } from '../../core/Models/note';
import { DataService } from '../../core/services/data-service/data.service';
import { NoteService } from '../../core/services/note/note.service';
import { FormControl } from '@angular/forms';


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
  labelName!: string;
  refreshEle = viewChild<ElementRef<HTMLDivElement>>('refresh');
  search = new FormControl('');

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
    private _dataService: DataService,
    private matDailog: MatDialog,
    private service: NoteService,
    private breakpointObserver: BreakpointObserver,
    private matdailog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {
    this.email = localStorage.getItem('email');
    this.name = localStorage.getItem('name');
    this.userid = localStorage.getItem('userid');
    this.token = localStorage.getItem('token');
    this._dataService.onTokenInitialize(this.token);
    this._dataService.onUserIdInitialize(this.userid);
    // localStorage.clear();
  }

  public get usernameFirstLetter(): string {
    return this.name.substring(0, 1).toUpperCase();
  }


  async ngOnInit() {
    this.userAvatar = this._dataService.avatar;
    this.service.fetchLabels();
    this._dataService.labels$.subscribe((labels: NoteLabel[]) => {
      this.labels = labels;
    });
    this.search.valueChanges
      .pipe(debounceTime(800))
      .subscribe({
        next: (value) => console.log(value)
      })
  }

  refresh() {
    this._dataService.emitPageRefesh();
  }

  onClearSearch() {
    this.search.reset();
  }


  //To change the note style view
  onViewChange() {
    if (this.viewType) {
      this.view = "listico";
    } else {
      this.view = "gridico";
    }
    this.viewType = !this.viewType;
    this._dataService.onViewChange(this.viewType);

  }

  file() {
    const dialogBox = this.matDailog.open(ImageUploadComponent);
    dialogBox.afterClosed().subscribe(data => {
      if (!data) return;
      const formData = new FormData();
      formData.append('image', data);
      this.service.userProfile(formData).subscribe({
        next: (result) => {
          localStorage.setItem('profile', result['profile']);
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

  labelsPage(l) {
    this.labelName = l.name;
  }

  editLabels() {
    this.matdailog.open(EditLabelsComponent, { data: this.labels });
  }
}
