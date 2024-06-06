import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserNotesComponent } from './user-notes.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegistrationComponent } from 'src/app/components/registration/registration.component';
import { ForgotPasswordComponent } from 'src/app/components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from 'src/app/components/reset-password/reset-password.component';
import { TakeNoteComponent } from '../take-note/take-note.component';
import { NoteComponent } from '../note/note.component';
import { RemindersComponent } from '../reminders/reminders.component';
import { IconsToolbarComponent } from '../icons-toolbar/icons-toolbar.component';
import { ArchiveComponent } from '../archive/archive.component';
import { TrashComponent } from '../trash/trash.component';
import { PinComponent } from '../pin/pin.component';
import { UpdateNoteComponent } from '../update-note/update-note.component';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule, MatCardModule, MatFormFieldModule, MatIconModule, MatButtonModule, MatSnackBarModule, MatToolbarModule, MatTooltipModule, MatSidenavModule, MatMenuModule, MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { A11yModule } from '@angular/cdk/a11y';
import { ImageCropperModule } from 'ngx-image-cropper';



describe('UserNotesComponent', () => {
  let component: UserNotesComponent;
  let fixture: ComponentFixture<UserNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserNotesComponent,
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
        PinComponent,
        UpdateNoteComponent,
        ImageUploadComponent,
       ],
       imports:[
        BrowserModule,
        // AppRoutingModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        HttpClientModule,
        MatToolbarModule,
        MatTooltipModule,
        FormsModule,
        MatSidenavModule,
        MatMenuModule,
        MatDialogModule,
        A11yModule,
        ImageCropperModule,
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
