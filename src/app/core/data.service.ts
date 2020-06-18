import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { fail } from 'assert';

import { IStudent, ICourse, ICourseList } from '../../app/shared/interfaces';

@Injectable()
export class DataService {

  baseUrl: string = 'assets/';

  private _students: IStudent[];
  private _courses: ICourse [];

  constructor(private http: HttpClient) {
    this._students = [
      {
        "id": 1,
        "firstName": "Jerrod ",
        "lastName": "Percival",
        "city": "Makati City",
        "courseId": 1
      },
      {
        "id": 2,
        "firstName": "Evelyn",
        "lastName": "Randell",
        "city": "Cebu City",
        "courseId": null
      },
      {
        "id": 3,
        "firstName": "Anant",
        "lastName": "Beckham",
        "city": "Cebu City",
        "courseId": 2
      },
      {
        "id": 4,
        "firstName": "Dalton",
        "lastName": "Belcher",
        "city": "Dumaguete City",
        "courseId": 4
      }
    ];

    this._courses = [
      {
        "id": 1,
        "name": "Agriculture"
      },
      {
        "id": 2,
        "name": "Computer Science"
      },
      {
        "id": 3,
        "name": "Mathematics"
      },
      {
        "id": 4,
        "name": "Biology"
      }
    ];
  }

  //getStudents(): Observable<object> {
  //  return this.http.get<object>(this.baseUrl + 'students.json')
  //    .pipe(
  //      catchError(this.handleError)
  //    );
  //}

  //getCourses(): Observable<object> {
  //  return this.http.get<object>(this.baseUrl + 'courses.json')
  //    .pipe(
  //      catchError(this.handleError)
  //    );
  //}

  getStudents() {
    return this._students.map((student: IStudent) => {
      let courses = this._courses.filter((course: ICourse) => course.id === student.courseId);
      return {
        id: student.id,
        name: student.firstName + " " + student.lastName,
        city: student.city,
        course: (!courses || !courses.length) ? "" : courses[0].name
      }
    });
  }

  getStudent(id: number) {
    let student: IStudent = {
      "id": 0,
      "firstName": "",
      "lastName": "",
      "city": "",
      "courseId": null
    }

    let students = this._students.filter((student: IStudent)  => student.id === id);
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
    this._students = this._students.filter((student: IStudent) => student.id !== id);
  }

  saveStudent(data: IStudent) {
    let students = this._students.filter((student: IStudent) => student.id === data.id);
    if (!students || !students.length) {
      data.id = Math.max.apply(Math, this._students.map((student: IStudent) => { return student.id; })) + 1;
      this._students.push(data);
    } else {
      var student = students[0];
      student.firstName = data.firstName;
      student.lastName = data.lastName;
      student.city = data.city;
      student.courseId = data.courseId;
    }
  }

  getCourses() {
      return this._courses.map((course: ICourseList) => {
      let students = this._students.filter((student: IStudent) => course.id === student.courseId);
        return {
          id: course.id,
          name: course.name,
          isDeletable: (students && students.length) ? false : true
        }
    });
  }

  getCourse(id: number) {
    let course: ICourse = {
      "id": 0,
      "name": ""
    }

    let courses = this._courses.filter((course: ICourse) => course.id === id);
    if (courses && courses.length) {
      course.id = courses[0].id;
      course.name = courses[0].name;
    }
    return course;
  }

  saveCourse(data: ICourse) {
    let courses = this._courses.filter((course: ICourse) => course.id === data.id);
    if (!courses || !courses.length) {
      data.id = Math.max.apply(Math, this._courses.map((course: ICourse) => { return course.id; })) + 1;
      this._courses.push(data);
    } else {
      var course = courses[0];
      course.name = data.name;
    }
  }

  deleteCourse(id: number) {
    this._courses = this._courses.filter((course: ICourse) => course.id !== id);
  }

  //private handleError(error: any) {
  //  console.error('server error:', error);
  //  if (error.error instanceof Error) {
  //    const errMessage = error.error.message;
  //    return Observable.throw(errMessage);
  //  }
  //  return Observable.throw(error || 'Node.js server error');
  //}
}
