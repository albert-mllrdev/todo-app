import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { FormGroup,  FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';

import { ISubTask } from '@interfaces/subtask';


@Component({
  selector: 'app-task-sub-task-form',
  templateUrl: './task.form.subtask.component.html',
  styleUrls: ['./task.form.subtask.component.scss']
})
export class TaskFormSubTaskComponent implements OnInit {
  @Input() subTask: ISubTask;
  @Input() i: number;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {

   }
}
