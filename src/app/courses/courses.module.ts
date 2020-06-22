import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';

import { CoursesRoutingModule } from './courses.routing.module';
import { CoursesComponent } from './courses.component';
import { CoursesListComponent } from './courses.list/courses.list.component';
import { CourseViewComponent } from './course.view/course.view.component';
import { CourseFormComponent } from './course.form/course.form.component';
import { CoursesListRowComponent } from './courses.list/courses.list.row/course.list.row.component';

@NgModule({
  imports: [CommonModule, FormsModule, CoursesRoutingModule, ReactiveFormsModule, OrderModule, FilterPipeModule],
  declarations: [CoursesComponent, CoursesListComponent, CoursesListRowComponent, CourseViewComponent, CourseFormComponent],
  exports: []
})

export class CoursesModule { }
