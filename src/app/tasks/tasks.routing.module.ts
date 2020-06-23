import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasksComponent } from './tasks.component';
import { TaskViewComponent } from './tasks.view/task.view.component';

const routes: Routes = [
  { path: '', component: TasksComponent },
  { path: 'view/:taskId', component: TaskViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TasksRoutingModule { }
