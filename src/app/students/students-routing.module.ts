import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentViewComponent } from './student-view/student-view.component';

const routes: Routes = [
  { path: 'students/new', component: StudentViewComponent },
  { path: 'students/view/:id', component: StudentViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StudentsRoutingModule {

}
