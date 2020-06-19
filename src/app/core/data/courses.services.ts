import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IStudent, ICourse, ICourseList } from '../../../app/shared/interfaces';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CoursesDataService extends DataService  {
  constructor(public dataService: DataService, private httpClient: HttpClient) {
    super(httpClient);
  }

  getCoursesList(): Observable<ICourseList[]> {
    const courseList: ICourseList[] = [];
    let studentList: IStudent[] = [];

    this.dataService.getStudents().subscribe((stud: IStudent[]) => {
      studentList = stud;
    });

    this.dataService.getCourses().subscribe((cou: ICourse[]) => {
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

    const courses = this.dataService.courses.filter((cou: ICourse) => cou.id === id);
    if (courses && courses.length) {
      course.id = courses[0].id;
      course.name = courses[0].name;
    }
    return course;
  }

  saveCourse(data: ICourse) {
    const courses = this.dataService.courses.filter((course: ICourse) => course.id === data.id);
    if (!courses || !courses.length) {
      data.id = Math.max.apply(Math, this.dataService.courses.map((course: ICourse) => course.id)) + 1;
      this.dataService.courses.push(data);
    } else {
      const course = courses[0];
      course.name = data.name;
    }
  }

  deleteCourse(id: number) {
    this.dataService.courses = this.dataService.courses.filter((course: ICourse) => course.id !== id);
  }
}
