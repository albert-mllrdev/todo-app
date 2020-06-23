import { Component, OnInit, Input } from '@angular/core';

import { ITask } from '@interfaces/task';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks.list.component.html',
  styleUrls: ['./tasks.list.component.scss']
})

export class TasksListComponent implements OnInit {
  @Input () tasks: ITask[];

  constructor() { }

  ngOnInit() { }
}