import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CourseDataService } from 'src/app/core/data/data.course.service';
import { IStudent } from '@interfaces/student';
import { ICourse } from '@interfaces/course';


@Component({
  selector: 'app-students-list-row',
  templateUrl: './students.list.row.component.html',
  styleUrls: ['./students.list.row.component.scss']
})

export class StudentsListRowComponent implements OnInit {
  course = ' ';
  @Input () student: IStudent;
  @Output() deleteStudentEvent = new EventEmitter();

  constructor(private courseDataService: CourseDataService) { }

  ngOnInit() {
    this.setCourse();
   }

   setCourse(){
      this.courseDataService.getCourse(this.student.courseId).subscribe((course: ICourse) => {
        if (course){
          this.course = course.name;
        }
      });
   }

   deleteStudent(studentId){
      this.deleteStudentEvent.emit(studentId);
   }
}
