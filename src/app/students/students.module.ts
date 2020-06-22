import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';

import { StudentsRoutingModule } from './students.routing.module';
import { StudentsComponent } from './students.component';
import { StudentsListComponent } from './students.list/students.list.component';
import { StudentsListRowComponent } from './students.list/students.list.row/students.list.row.component';
import { StudentViewComponent } from './student.view/student.view.component';
import { StudentFormComponent } from './student.form/student.form.component';

@NgModule({
  imports: [CommonModule, FormsModule, StudentsRoutingModule, ReactiveFormsModule, OrderModule, FilterPipeModule],
  declarations: [StudentsComponent, StudentsListComponent, StudentsListRowComponent, StudentViewComponent, StudentFormComponent],
  exports: []
})

export class StudentsModule { }
