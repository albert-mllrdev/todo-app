import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CoursesComponent } from './courses.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseViewComponent } from './course-view/course-view.component';

@NgModule({
  imports: [CommonModule, FormsModule, CoursesRoutingModule],
  declarations: [CoursesComponent, CoursesListComponent, CourseViewComponent],
  exports: [CoursesComponent]
})

export class CoursesModule { }
