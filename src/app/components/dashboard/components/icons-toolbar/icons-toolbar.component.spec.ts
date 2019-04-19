import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsToolbarComponent } from './icons-toolbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginComponent } from 'src/app/components/login/login.component';
import { RegistrationComponent } from 'src/app/components/registration/registration.component';
import { ForgotPasswordComponent } from 'src/app/components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from 'src/app/components/reset-password/reset-password.component';
import { DashboardComponent } from '../../dashboard.component';
import { NoteComponent } from '../note/note.component';
import { RemindersComponent } from '../reminders/reminders.component';
import { ArchiveComponent } from '../archive/archive.component';
import { TrashComponent } from '../trash/trash.component';
import { UserNotesComponent } from '../user-notes/user-notes.component';

describe('IconsToolbarComponent', () => {
  let component: IconsToolbarComponent;
  let fixture: ComponentFixture<IconsToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IconsToolbarComponent,
        LoginComponent,
        RegistrationComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        DashboardComponent,
        NoteComponent,
        RemindersComponent,
        ArchiveComponent,
        TrashComponent,
        UserNotesComponent,
      ],
      imports: [
        MatMenuModule,
        HttpClientModule,
        AppRoutingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
