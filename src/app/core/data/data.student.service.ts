import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

// import { IStudent } from '@interfaces/student';
import { IStudent } from '../../shared/interfaces/student';

@Injectable({
  providedIn: 'root',
})

export class StudentDataService {

  baseUrl = 'assets/';

  students: IStudent[] = null;

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
          })
        );
    }
  }

  getStudent(studentId: number): Observable<IStudent> {
    return this.getStudents().pipe(
      map(students => {
        const [studentResult] = students.filter((student: IStudent)  => student.id === studentId);
        return studentResult;
      })
    );
  }

  getStudentByCourseId(courseId: number): Observable<IStudent[]> {
    return this.getStudents().pipe(
      map(students => {
        return students.filter((student: IStudent)  => student.courseId === courseId);
      })
    );
  }

  saveStudent(formData: IStudent) {
    if (formData.courseId !== null) {
      formData.courseId = +formData.courseId;
    }
    const [studentResult] = this.students.filter((student: IStudent)  => student.id === formData.id);
    if (studentResult){
      this.students[this.students.indexOf(studentResult)] = {... formData};
    }else{
      formData.id = Math.max.apply(Math, this.students.map((student: IStudent) => student.id)) + 1;
      this.students.push(formData);
    }
  }

  deleteStudent(studentId: number) {
    this.students = this.students.filter((student: IStudent) => student.id !== studentId);
  }
}
