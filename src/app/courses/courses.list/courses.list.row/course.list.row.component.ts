import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { StudentDataService } from 'src/app/core/data/data.student.service';
import { IStudent } from 'src/app/shared/interfaces/student';
import { ICourse } from 'src/app/shared/interfaces/course';

@Component({
  selector: 'app-courses-list-row',
  templateUrl: './courses.list.row.component.html',
  styleUrls: ['./courses.list.row.component.scss']
})

export class CoursesListRowComponent implements OnInit {
  hasStudents: boolean;
  @Input () course: ICourse;
  @Output() deleteCourseEvent = new EventEmitter();

  constructor(private studentDataService: StudentDataService) { }

  ngOnInit() {
    this.setDeletable();
  }

  setDeletable(){
    this.studentDataService.getStudentByCourseId(this.course.id).subscribe((students: IStudent[]) => {
      this.hasStudents = (students.length === 0);
    });
  }

  deleteCourse(courseId){
    this.deleteCourseEvent.emit(courseId);
  }
}
