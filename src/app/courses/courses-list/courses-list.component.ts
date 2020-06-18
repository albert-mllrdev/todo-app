import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICourseList } from 'src/app/shared/interfaces';
import { DataService } from 'src/app/core/data.service';
import { SorterService } from 'src/app/core/sorter.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['../../shared/component.list.css', './courses-list.css']
})

export class CoursesListComponent implements OnInit {
  courses: ICourseList[] = [];
  private allCourses: ICourseList[] = [];
  currentFilter = '';

  constructor(private dataService: DataService, private sorterService: SorterService, public router: Router) { }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.allCourses = this.dataService.getCourses();
    this.courses = this.allCourses;
    this.sorterService.sort(this.courses, 'name', true);
    this.filter();
  }

  delete(id) {
    if (confirm('Are you sure you want to delete course?')) {
      this.dataService.deleteCourse(id);
      this.reload();
    }
  }

  filter() {
    if (this.currentFilter) {
      this.courses = this.allCourses.filter((course: ICourseList) => {
        return (course.name.toLowerCase().indexOf(this.currentFilter.toLowerCase()) > -1);
      });
    } else {
      this.courses = this.allCourses;
    }
  }
}
