import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {
  AuthGuardService
} from './services/authentication/auth-guard.service';
import { NoteComponent } from './components/dashboard/components/note/note.component';
import { RemindersComponent } from './components/dashboard/components/reminders/reminders.component';
import { ArchiveComponent } from './components/dashboard/components/archive/archive.component';
import { TrashComponent } from './components/dashboard/components/trash/trash.component';
import { LabelsComponent } from './components/dashboard/components/labels/labels.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    component: LoginComponent,
    children: []
  },
  {
    path: 'signup',
    component: RegistrationComponent
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent
  },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'note',
        pathMatch: 'full'
      },
      {
        path: 'note',
        component: NoteComponent
      },
      {
        path: 'reminders',
        component: RemindersComponent
      },
      {
        path: 'archive',
        component: ArchiveComponent
      }, {
        path: 'trash',
        component: TrashComponent
      },
      {
        path: 'labels/:name',
        component: LabelsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
