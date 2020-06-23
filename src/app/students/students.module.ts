import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { StudentsComponent } from './students.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentViewComponent } from './student-view/student-view.component';
import { StudentsRoutingModule } from './students-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, StudentsRoutingModule],
  declarations: [StudentsComponent, StudentsListComponent, StudentViewComponent],
  exports: [StudentsComponent]
})

export class StudentsModule { }
