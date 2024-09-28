import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
//we have to import this module for taking form inputs froms
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';


import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { HttpClientModule } from '@angular/common/http';
import { A11yModule } from '@angular/cdk/a11y';
import { AsyncPipe } from '../../node_modules/@angular/common';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TakeNoteComponent } from './pages/dashboard/components/take-note/take-note.component';
import { NoteComponent } from './pages/dashboard/components/note/note.component';
import { IconsToolbarComponent } from './pages/dashboard/components/icons-toolbar/icons-toolbar.component';
import { RemindersComponent } from './pages/dashboard/components/reminders/reminders.component';
import { ArchiveComponent } from './pages/dashboard/components/archive/archive.component';
import { TrashComponent } from './pages/dashboard/components/trash/trash.component';
import { UserNotesComponent } from './pages/dashboard/components/user-notes/user-notes.component';
import { PinComponent } from './pages/dashboard/components/pin/pin.component';
import { UpdateNoteComponent } from './pages/dashboard/components/update-note/update-note.component';
import { ImageUploadComponent } from './pages/dashboard/components/image-upload/image-upload.component';
import { LabelsComponent } from './pages/dashboard/components/labels/labels.component';
import { EditLabelsComponent } from './pages/dashboard/components/edit-labels/edit-labels.component';
import { NoteLabelsComponent } from './pages/dashboard/components/note-labels/note-labels.component';
import { SketchComponent } from './pages/sketch/sketch.component';
import { PaintPaletteComponent } from './pages/sketch/paint-palette/paint-palette.component';
import { SharedModule } from './core/shared/shared.module';
import { PaintToolbarComponent } from './pages/sketch/paint-toolbar/paint-toolbar.component';
import { AuthModule } from './pages/auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
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
    LabelsComponent,
    EditLabelsComponent,
    NoteLabelsComponent,
    SketchComponent,
    PaintPaletteComponent,
    PaintToolbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    
    //repeated
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    ////
    AppRoutingModule,
    DragDropModule,
    MatCardModule,
    MatSnackBarModule,
    HttpClientModule,
    MatToolbarModule,
    MatTooltipModule,
    
    MatSidenavModule,
    MatMenuModule,
    MatDialogModule,
    A11yModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatNativeDateModule,
    MatSelectModule,
    ImageCropperComponent,
    SharedModule,
    AuthModule
  ],
  // entryComponents: [UpdateNoteComponent, ImageUploadComponent, EditLabelsComponent],
  providers: [AsyncPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
