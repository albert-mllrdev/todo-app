import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IStudent, ICourse, IStudentList } from '../../../app/shared/interfaces';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StudentDataService extends DataService{
  constructor(public dataService: DataService, private httpClient: HttpClient) {
    super(httpClient);
  }

  getStudentList(): Observable<IStudentList[]> {
    const studentList: IStudentList[] = [];
    let courseList: ICourse[] = [];

    this.dataService.getCourses().subscribe((courses: ICourse[]) => {
      courseList = courses;
    });

    this.dataService.getStudents().subscribe((stud: IStudent[]) => {
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

    this.dataService.getStudents().subscribe((stud: IStudent[]) => {
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

  saveStudent(data: IStudent): Observable<IStudent> {
    if (data.courseId !== null) {
      data.courseId = +data.courseId;
    }

    if (data.courseId === 0){
      data.courseId = null;
    }

    let student: IStudent = null;

    this.dataService.getStudents().subscribe((stud: IStudent[]) => {
      const result = stud.filter((st: IStudent)  => st.id === data.id);
      if (result && result.length) {
        student = result[0];
        student.firstName = data.firstName;
        student.lastName = data.lastName;
        student.city = data.city;
        student.courseId = data.courseId;
      }else{
        student = {
          id : Math.max.apply(Math, this.dataService.students.map((st: IStudent) => st.id)) + 1,
          firstName : data.firstName,
          lastName : data.lastName,
          city : data.city,
          courseId : data.courseId
        };
        this.dataService.students.push(student);
      }
    });
    return of(student);
  }

  deleteStudent(id: number) {
    this.dataService.students = this.dataService.students.filter((student: IStudent) => student.id !== id);
  }
}
