import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseViewComponent } from './course.view/course.view.component';
import { CoursesComponent } from './courses.component';

const routes: Routes = [
  { path: '', component: CoursesComponent },
  { path: 'new', component: CourseViewComponent },
  { path: 'view/:courseId', component: CourseViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CoursesRoutingModule { }
