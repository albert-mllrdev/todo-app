import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task.view.component.html'
})

export class TaskViewComponent implements OnInit {
  taskId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.taskId = +this.route.snapshot.paramMap.get('taskId');
  }
}
