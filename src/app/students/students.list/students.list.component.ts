import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { StudentDataService } from 'src/app/core/data/data.student.service';
import { IStudent } from '@interfaces/student';


@Component({
  selector: 'app-students-list',
  templateUrl: './students.list.component.html',
  styleUrls: ['../../shared/styles/list.component.scss']
})

export class StudentsListComponent implements OnInit {
  @Input () students: IStudent[];
  sortField = 'firstName';
  filterType = 1;
  studentFilter: any = { firstName: '', lastName: '', city: '' };

  constructor(private studentDataService: StudentDataService, public router: Router) { }

  ngOnInit() { }

  deleteStudent(studentId) {
    if (confirm('Are you sure you want to delete student?')) {
      this.studentDataService.deleteStudent(studentId);
      this.students = this.students.filter((student: IStudent) => student.id !== studentId);
    }
  }

  clearFilters() {
    this.studentFilter.firstName = '';
    this.studentFilter.lastName = '';
    this.studentFilter.city = '';
  }
}
