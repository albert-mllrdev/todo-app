import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentViewComponent } from './student.view/student.view.component';
import { StudentsComponent } from './students.component';

const routes: Routes = [
  { path: '', component: StudentsComponent },
  { path: 'new', component: StudentViewComponent },
  { path: 'view/:studentId', component: StudentViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StudentsRoutingModule { }
