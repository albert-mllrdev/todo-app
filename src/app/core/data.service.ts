import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { IStudent, ICourse } from '../../app/shared/interfaces';

@Injectable()
export class DataService {

  baseUrl = 'assets/';

  students: IStudent[] = null;
  courses: ICourse [] = null;

  constructor(private http: HttpClient) {  }

  getStudents(): Observable<IStudent[]> {
    if (this.students){
      return of(this.students);
    }
    else {
      return this.http.get<IStudent[]>(this.baseUrl + 'students.json')
        .pipe(
          map(students => {
            this.students = students;
            return students;
          }),
          catchError(this.handleError)
        );
    }
  }

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
          }),
          catchError(this.handleError)
        );
    }
  }

  private handleError(error: any) {
   console.error('server error:', error);
   if (error.error instanceof Error) {
     const errMessage = error.error.message;
     return throwError;
   }
   return throwError(error || 'Node.js server error');
  }
}
