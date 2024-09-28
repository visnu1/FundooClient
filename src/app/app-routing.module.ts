import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegistrationComponent } from './pages/auth/registration/registration.component';
import { ForgotPasswordComponent } from './pages/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NoteComponent } from './pages/dashboard/components/note/note.component';
import { RemindersComponent } from './pages/dashboard/components/reminders/reminders.component';
import { ArchiveComponent } from './pages/dashboard/components/archive/archive.component';
import { TrashComponent } from './pages/dashboard/components/trash/trash.component';
import { LabelsComponent } from './pages/dashboard/components/labels/labels.component';
import { SketchComponent } from './pages/sketch/sketch.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
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
  }, {
    path: 'sketch',
    component: SketchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
