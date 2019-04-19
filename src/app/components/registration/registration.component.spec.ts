import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material'
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginComponent } from '../login/login.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { TakeNoteComponent } from '../dashboard/components/take-note/take-note.component';
import { NoteComponent } from '../dashboard/components/note/note.component';
import { IconsToolbarComponent } from '../dashboard/components/icons-toolbar/icons-toolbar.component';
import { ArchiveComponent } from '../dashboard/components/archive/archive.component';
import { TrashComponent } from '../dashboard/components/trash/trash.component';
import { PinComponent } from '../dashboard/components/pin/pin.component';
import { ImageUploadComponent } from '../dashboard/components/image-upload/image-upload.component';
import { UpdateNoteComponent } from '../dashboard/components/update-note/update-note.component';
import { UserNotesComponent } from '../dashboard/components/user-notes/user-notes.component';
import { RemindersComponent } from '../dashboard/components/reminders/reminders.component';



describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RegistrationComponent,
        LoginComponent,
        RegistrationComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        DashboardComponent,
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
        FormsModule,
        MatFormFieldModule,
        BrowserAnimationsModule,
        MatInputModule,
        ReactiveFormsModule,
        MatIconModule,
        MatSnackBarModule,
        AppRoutingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
