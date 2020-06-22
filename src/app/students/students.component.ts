import { Component, OnInit } from '@angular/core';

import { StudentDataService } from '../core/data/data.student.service';
import { IStudent } from '../shared/interfaces/student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html'
})

export class StudentsComponent implements OnInit {
  students: IStudent[] = [];

  constructor(private studentDataService: StudentDataService) { }
  ngOnInit() {
    this.loadStudents();
  }

  loadStudents(){
    this.studentDataService.getStudents().subscribe((students: IStudent[]) => {
      this.students = students;
    });
  }
}
