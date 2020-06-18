import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IStudentList } from 'src/app/shared/interfaces';
import { DataService } from 'src/app/core/data.service';
import { SorterService } from 'src/app/core/sorter.service';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['../../shared/component.list.css']
})

export class StudentsListComponent implements OnInit {
  students: IStudentList[] = [];
  private allStudents: IStudentList[] = [];
  currentFilter = '';

  constructor(private dataService: DataService, private sorterService: SorterService, public router: Router) { }

  ngOnInit() {
    this.reload();
  }

  private reload() {
    this.allStudents = this.dataService.getStudents();
    this.students = this.allStudents;
    this.sorterService.sort(this.students, 'name', true);
    this.filter();
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
