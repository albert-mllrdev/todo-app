import { Component, OnInit } from '@angular/core';

import { TaskDataService } from '../core/data/data.task.service';
import { ITask } from '../shared/interfaces/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html'
})

export class TasksComponent implements OnInit {
  tasks: ITask[] = [];

  constructor(private taskDataService: TaskDataService) { }
  ngOnInit() {
    this.loadTasks();
  }

  loadTasks(){
    this.taskDataService.getTasks().subscribe((tasks: ITask[]) => {
      this.tasks = tasks;
    });
  }
}
