import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { fail } from 'assert';

import { IStudent, ICourse, ICourseList } from '../../app/shared/interfaces';

@Injectable()
export class DataService {

  baseUrl = 'assets/';

  private allStudents: IStudent[];
  private allCourses: ICourse [];

  constructor(private http: HttpClient) {
    this.allStudents = [
      {
        id: 1,
        firstName: 'Jerrod ',
        lastName: 'Percival',
        city: 'Makati City',
        courseId: 1
      },
      {
        id: 2,
        firstName: 'Evelyn',
        lastName: 'Randell',
        city: 'Cebu City',
        courseId: null
      },
      {
        id: 3,
        firstName: 'Anant',
        lastName: 'Beckham',
        city: 'Cebu City',
        courseId: 2
      },
      {
        id: 4,
        firstName: 'Dalton',
        lastName: 'Belcher',
        city: 'Dumaguete City',
        courseId: 4
      }
    ];

    this.allCourses = [
      {
        id: 1,
        name: 'Agriculture'
      },
      {
        id: 2,
        name: 'Computer Science'
      },
      {
        id: 3,
        name: 'Mathematics'
      },
      {
        id: 4,
        name: 'Biology'
      }
    ];
  }

  // getStudents(): Observable<object> {
  //  return this.http.get<object>(this.baseUrl + 'students.json')
  //    .pipe(
  //      catchError(this.handleError)
  //    );
  // }

  // getCourses(): Observable<object> {
  //  return this.http.get<object>(this.baseUrl + 'courses.json')
  //    .pipe(
  //      catchError(this.handleError)
  //    );
  // }

  getStudents() {
    return this.allStudents.map((student: IStudent) => {
      const courses = this.allCourses.filter((course: ICourse) => course.id === student.courseId);
      return {
        id: student.id,
        name: student.firstName + ' ' + student.lastName,
        city: student.city,
        course: (!courses || !courses.length) ? '' : courses[0].name
      };
    });
  }

  getStudent(id: number) {
    const student: IStudent = {
      id: 0,
      firstName: '',
      lastName: '',
      city: '',
      courseId: null
    };

    const students = this.allStudents.filter((stud: IStudent)  => stud.id === id);
    if (students && students.length) {
      student.id = students[0].id;
      student.firstName = students[0].firstName;
      student.lastName = students[0].lastName;
      student.city = students[0].city;
      student.courseId = students[0].courseId;
    }
    return student;
  }

  deleteStudent(id: number) {
    this.allStudents = this.allStudents.filter((student: IStudent) => student.id !== id);
  }

  saveStudent(data: IStudent) {
    if (data.courseId !== null) {
      data.courseId = +data.courseId;
    }
    const students = this.allStudents.filter((student: IStudent) => student.id === data.id);
    if (!students || !students.length) {
      data.id = Math.max.apply(Math, this.allStudents.map((student: IStudent) => student.id)) + 1;
      this.allStudents.push(data);
    } else {
      const student = students[0];
      student.firstName = data.firstName;
      student.lastName = data.lastName;
      student.city = data.city;
      student.courseId = data.courseId;
    }
  }

  getCourses() {
      return this.allCourses.map((course: ICourseList) => {
      const students = this.allStudents.filter((student: IStudent) => course.id === student.courseId);
      return {
          id: course.id,
          name: course.name,
          isDeletable: (students && students.length) ? false : true
        };
    });
  }

  getCourse(id: number) {
    const course: ICourse = {
      id: 0,
      name: ''
    };

    const courses = this.allCourses.filter((cou: ICourse) => cou.id === id);
    if (courses && courses.length) {
      course.id = courses[0].id;
      course.name = courses[0].name;
    }
    return course;
  }

  saveCourse(data: ICourse) {
    const courses = this.allCourses.filter((course: ICourse) => course.id === data.id);
    if (!courses || !courses.length) {
      data.id = Math.max.apply(Math, this.allCourses.map((course: ICourse) => course.id)) + 1;
      this.allCourses.push(data);
    } else {
      const course = courses[0];
      course.name = data.name;
    }
  }

  deleteCourse(id: number) {
    this.allCourses = this.allCourses.filter((course: ICourse) => course.id !== id);
  }

  // private handleError(error: any) {
  //  console.error('server error:', error);
  //  if (error.error instanceof Error) {
  //    const errMessage = error.error.message;
  //    return Observable.throw(errMessage);
  //  }
  //  return Observable.throw(error || 'Node.js server error');
  // }
}
