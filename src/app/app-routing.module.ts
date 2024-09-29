import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NoteComponent } from './pages/dashboard/components/note/note.component';
import { RemindersComponent } from './pages/dashboard/components/reminders/reminders.component';
import { ArchiveComponent } from './pages/dashboard/components/archive/archive.component';
import { TrashComponent } from './pages/dashboard/components/trash/trash.component';
import { LabelsComponent } from './pages/dashboard/components/labels/labels.component';
import { SketchComponent } from './pages/sketch/sketch.component';
import { authGuard } from './core/guards/auth.guard';


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
    canActivate: [authGuard],
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
  },
  {
    path: 'sketch',
    component: SketchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
