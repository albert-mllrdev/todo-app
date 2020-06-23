import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TasksRoutingModule } from './tasks.routing.module';
import { TasksComponent } from './tasks.component';
import { TasksListComponent } from './tasks.list/tasks.list.component';
import { TasksListRowComponent } from './tasks.list/tasks.list.row/tasks.list.row.component';
import { TaskViewComponent } from './tasks.view/task.view.component';
import { TaskFormComponent } from './task.form/task.form.component';
import { TaskFormSubTaskComponent } from './task.form/task.form.subtask/task.form.subtask.component';

@NgModule({
  imports: [CommonModule, FormsModule, TasksRoutingModule, ReactiveFormsModule, OrderModule,
            FilterPipeModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule],
  declarations: [TasksComponent, TasksListComponent, TasksListRowComponent, TaskViewComponent, TaskFormComponent, TaskFormSubTaskComponent],
  exports: []
})

export class TasksModule { }
