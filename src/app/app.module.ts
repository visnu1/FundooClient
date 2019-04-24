import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
//we have to import this module for taking form inputs froms
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TakeNoteComponent } from './components/dashboard/components/take-note/take-note.component'
import { NoteComponent } from './components/dashboard/components/note/note.component';
import { IconsToolbarComponent } from './components/dashboard/components/icons-toolbar/icons-toolbar.component';
import { ImageUploadComponent } from './components/dashboard/components/image-upload/image-upload.component';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NativeDateModule } from '@angular/material';
import { MatNativeDateModule, MatSliderModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';



import { HttpClientModule } from '@angular/common/http';
import { RemindersComponent } from './components/dashboard/components/reminders/reminders.component';
import { ArchiveComponent } from './components/dashboard/components/archive/archive.component';
import { TrashComponent } from './components/dashboard/components/trash/trash.component';
import { UserNotesComponent } from './components/dashboard/components/user-notes/user-notes.component';


import { A11yModule } from '@angular/cdk/a11y';
import { PinComponent } from './components/dashboard/components/pin/pin.component';
import { UpdateNoteComponent } from './components/dashboard/components/update-note/update-note.component';
import { ImageCropperModule } from 'ngx-image-cropper';



@NgModule({
  declarations: [
    AppComponent,
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
    BrowserModule,
    AppRoutingModule,
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
    MatDatepickerModule,
    NativeDateModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  entryComponents: [UpdateNoteComponent, ImageUploadComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
