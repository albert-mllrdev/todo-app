import { Component, OnInit, Input } from '@angular/core';
import { FormGroup,  FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { TaskDataService } from 'src/app/core/data/data.task.service';
import { ITask } from '@interfaces/task';

@Component({
  selector: 'app-task-form',
  templateUrl: './task.form.component.html',
  styleUrls: ['./task.form.component.scss']
})
export class TaskFormComponent implements OnInit {
  @Input () taskId: number;

  profileForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', Validators.required),
    notes: new FormControl(''),
    date: new FormControl(''),
    isComplete: new FormControl(false),
    subTasks: new FormArray([])
  });

  get subTasks() {
    return this.profileForm.get('subTasks') as FormArray;
  }

  constructor(private taskDataService: TaskDataService, private formBuilder: FormBuilder,  public router: Router) { }

  ngOnInit(): void {
    this.loadTask(this.taskId);
  }

  loadTask(taskId: number){
    if (taskId){
      this.taskDataService.getTask(taskId).subscribe((task: ITask) => {
        if (task){

          for (let {} of task.subTasks) {
            this.addSubtask();
          }

          this.profileForm.setValue(task);
        }
      });
    }
  }

  saveTask(){
    if (this.profileForm.valid) {
      this.taskDataService.saveTask(this.profileForm.value);
    }
    this.router.navigate(['/tasks']);
  }

  deleteTask(){
    if (confirm('Are you sure you want to delete task?')) {
      this.taskDataService.deleteTask(this.taskId);
      this.router.navigate(['/tasks']);
    }
  }

  addSubtask(){
    this.subTasks.push(this.formBuilder.group({
      title: ['', Validators.required],
      isComplete: new FormControl(false)
    }));
  }

  removeSubTask(index: number){
    this.subTasks.removeAt(index);
  }
}
