import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ICourse } from '../../shared/interfaces/course';

@Injectable({
  providedIn: 'root',
})

export class CourseDataService {

  baseUrl = 'assets/';

  courses: ICourse [] = null;

  constructor(private http: HttpClient) {  }

  getCourses(): Observable<ICourse[]> {
    if (this.courses){
      return of(this.courses);
    }
    else {
      return this.http.get<ICourse[]>(this.baseUrl + 'courses.json')
        .pipe(
          map(courses => {
            this.courses = courses;
            return courses;
          })
        );
    }
  }

  getCourse(courseId: number): Observable<ICourse> {
    return this.getCourses().pipe(
      map(courses => {
        const [courseResult] = courses.filter((course: ICourse)  => course.id === courseId);
        return courseResult;
      })
    );
  }

  saveCourse(formData: ICourse) {
    const [courseResult] = this.courses.filter((course: ICourse)  => course.id === formData.id);
    if (courseResult){
      this.courses[this.courses.indexOf(courseResult)] = {... formData};
    }else{
      formData.id = Math.max.apply(Math, this.courses.map((course: ICourse) => course.id)) + 1;
      this.courses.push(formData);
    }
  }

  deleteCourse(courseId: number) {
    this.courses = this.courses.filter((course: ICourse) => course.id !== courseId);
  }
}
