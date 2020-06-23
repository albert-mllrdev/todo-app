import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ITask } from '../../shared/interfaces/task';

@Injectable({
  providedIn: 'root',
})

export class TaskDataService {

  baseUrl = 'assets/';

  tasks: ITask [] = null;

  constructor(private http: HttpClient) {  }

  getTasks(): Observable<ITask[]> {
    if (this.tasks){
      return of(this.tasks);
    }
    else {
      return this.http.get<ITask[]>(this.baseUrl + 'tasks.json')
        .pipe(
          map(tasks => {
            this.tasks = tasks;
            return tasks;
          })
        );
    }
  }

  getTask(taskId: number): Observable<ITask> {
    return this.getTasks().pipe(
      map(students => {
        const [taskResult] = students.filter((task: ITask)  => task.id === taskId);
        return taskResult;
      })
    );
  }

  saveTask(formData: ITask) {
    const [taskResult] = this.tasks.filter((task: ITask)  => task.id === formData.id);
    if (taskResult){
      this.tasks[this.tasks.indexOf(taskResult)] = {... formData};
    }else{
      formData.id = Math.max.apply(Math, this.tasks.map((task: ITask) => task.id)) + 1;
      this.tasks.push(formData);
    }
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter((task: ITask) => task.id !== taskId);
  }
}
