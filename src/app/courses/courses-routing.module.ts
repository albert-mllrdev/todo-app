import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CourseViewComponent } from './course-view/course-view.component';

const routes: Routes = [
  { path: 'courses/new', component: CourseViewComponent },
  { path: 'courses/view/:id', component: CourseViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CoursesRoutingModule {

}
