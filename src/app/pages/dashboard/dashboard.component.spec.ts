import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

import { TakeNoteComponent } from './components/take-note/take-note.component';
import { NoteComponent } from './components/note/note.component';
import { IconsToolbarComponent } from './components/icons-toolbar/icons-toolbar.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { UserNotesComponent } from './components/user-notes/user-notes.component';
import { PinComponent } from './components/pin/pin.component';
import { UpdateNoteComponent } from './components/update-note/update-note.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '../auth/login/login.component';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { ForgotPasswordComponent } from '../auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';
import { AppRoutingModule } from '../../app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        LoginComponent,
        RegistrationComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        TakeNoteComponent,
        NoteComponent,
        IconsToolbarComponent,
        RemindersComponent,
        ArchiveComponent,
        TrashComponent,
        UserNotesComponent,
        PinComponent,
        UpdateNoteComponent,
        ImageUploadComponent,
      ],
      imports: [
        MatSidenavModule,
        MatMenuModule,
        MatToolbarModule,
        AppRoutingModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatDialogModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
