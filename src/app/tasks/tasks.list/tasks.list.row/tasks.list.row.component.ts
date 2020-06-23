import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITask } from '@interfaces/task';
import { Router } from '@angular/router';
import { stringify } from 'querystring';

@Component({
  selector: 'app-tasks-list-row',
  templateUrl: './tasks.list.row.component.html',
  styleUrls: ['./tasks.list.row.component.scss']
})

export class TasksListRowComponent implements OnInit {
  @Input () task: ITask;

  constructor(public router: Router) { }

  ngOnInit() { }

  completeTask(event){
    this.task.isComplete = !this.task.isComplete;
    event.stopPropagation();
  }

  viewTask(){
    const viewURL = '/tasks/view/';
    this.router.navigate([`${viewURL}${this.task.id}`]);
  }
}
