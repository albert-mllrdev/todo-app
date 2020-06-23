import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IStudentList } from 'src/app/shared/interfaces';
import { SorterService } from 'src/app/core/sorter.service';
import { StudentDataService } from 'src/app/core/data/students.services';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['../../shared/component.list.css']
})

export class StudentsListComponent implements OnInit {
  private allStudents: IStudentList[] = [];
  students: IStudentList[] = [];
  currentFilter = '';

  constructor(private dataService: StudentDataService, private sorterService: SorterService, public router: Router) { }

  ngOnInit() {
    this.reload();
  }

  private reload() {
    this.dataService.getStudentList().subscribe((students: IStudentList[]) => {
      this.allStudents = students;
      this.students = this.allStudents;
      this.sorterService.sort(this.students, 'name', true);
      this.filter();
    });
  }

  delete(id) {
    if (confirm('Are you sure you want to delete student?')) {
      this.dataService.deleteStudent(id);
      this.reload();
    }
  }

  sort(prop: string) {
    this.sorterService.sort(this.students, prop);
  }

  filter() {
    if (this.currentFilter) {
      this.students = this.allStudents.filter((student: IStudentList) => {
        return (student.name.toLowerCase().indexOf(this.currentFilter.toLowerCase()) > -1 ||
          student.city.toLowerCase().indexOf(this.currentFilter.toLowerCase()) > -1 ||
          student.course.toLowerCase().indexOf(this.currentFilter.toLowerCase()) > -1);
      });
    } else {
      this.students = this.allStudents;
    }
  }
}
