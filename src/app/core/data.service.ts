import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { fail } from 'assert';

import { IStudent, ICourse, ICourseList, IStudentList } from '../../app/shared/interfaces';

@Injectable()
export class DataService {

  baseUrl = 'assets/';

  private students: IStudent[] = null;
  private courses: ICourse [] = null;

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

  getStudentList(): Observable<IStudentList[]> {
    const studentList: IStudentList[] = [];
    let courseList: ICourse[] = [];

    this.getCourses().subscribe((courses: ICourse[]) => {
      courseList = courses;
    });

    this.getStudents().subscribe((stud: IStudent[]) => {
      stud.map((student: IStudent) => {
        const courses = courseList.filter((course: ICourse) => course.id === student.courseId);
        studentList.push({
          id: student.id,
          name: student.firstName + ' ' + student.lastName,
          city: student.city,
          course: (!courses || !courses.length) ? '' : courses[0].name
         });
      });
    });
    return of(studentList);
  }

  getStudent(id: number): Observable<IStudent> {
    const student: IStudent = {
      id: 0,
      firstName: '',
      lastName: '',
      city: '',
      courseId: 0
    };

    this.getStudents().subscribe((stud: IStudent[]) => {
      const result = stud.filter((st: IStudent)  => st.id === id);
      if (result && result.length) {
        student.id = result[0].id;
        student.firstName = result[0].firstName;
        student.lastName = result[0].lastName;
        student.city = result[0].city;
        student.courseId = result[0].courseId ?? 0;
      }
    });
    return of(student);
  }

  deleteStudent(id: number) {
    this.students = this.students.filter((student: IStudent) => student.id !== id);
  }

  saveStudent(data: IStudent): Observable<IStudent> {
    if (data.courseId !== null) {
      data.courseId = +data.courseId;
    }

    if (data.courseId === 0){
      data.courseId = null;
    }

    let student: IStudent = null;

    this.getStudents().subscribe((stud: IStudent[]) => {
      const result = stud.filter((st: IStudent)  => st.id === data.id);
      if (result && result.length) {
        student = result[0];
        student.firstName = data.firstName;
        student.lastName = data.lastName;
        student.city = data.city;
        student.courseId = data.courseId;
      }else{
        student = {
          id : Math.max.apply(Math, this.students.map((st: IStudent) => st.id)) + 1,
          firstName : data.firstName,
          lastName : data.lastName,
          city : data.city,
          courseId : data.courseId
        };
        this.students.push(student);
      }
    });
    return of(student);
  }

  getCourses(): Observable<ICourse[]> {
    if (this.students){
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

  getCoursesList(): Observable<ICourseList[]> {
    const courseList: ICourseList[] = [];
    let studentList: IStudent[] = [];

    this.getStudents().subscribe((stud: IStudent[]) => {
      studentList = stud;
    });

    this.getCourses().subscribe((cou: ICourse[]) => {
      cou.map((course: ICourse) => {
        const students =  studentList.filter(std => std.courseId === course.id);
        courseList.push( {
          id: course.id,
          name: course.name,
          isDeletable: (students && students.length) ? false : true
        });
      });
    });
    return of(courseList);
  }

  getCourse(id: number) {
    const course: ICourse = {
      id: 0,
      name: ''
    };

    const courses = this.courses.filter((cou: ICourse) => cou.id === id);
    if (courses && courses.length) {
      course.id = courses[0].id;
      course.name = courses[0].name;
    }
    return course;
  }

  saveCourse(data: ICourse) {
    const courses = this.courses.filter((course: ICourse) => course.id === data.id);
    if (!courses || !courses.length) {
      data.id = Math.max.apply(Math, this.courses.map((course: ICourse) => course.id)) + 1;
      this.courses.push(data);
    } else {
      const course = courses[0];
      course.name = data.name;
    }
  }

  deleteCourse(id: number) {
    this.courses = this.courses.filter((course: ICourse) => course.id !== id);
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
