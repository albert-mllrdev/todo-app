import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ICourse } from 'src/app/shared/interfaces/course';
import { CourseDataService } from 'src/app/core/data/data.course.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses.list.component.html',
  styleUrls: ['../../shared/styles/list.component.scss']
})

export class CoursesListComponent implements OnInit {
  @Input () courses: ICourse[];
  courseFilter: any = { name: '' };

  constructor(private courseDataService: CourseDataService, public router: Router) { }

  ngOnInit() { }

  deleteCourse(courseId) {
    if (confirm('Are you sure you want to delete course?')) {
      this.courseDataService.deleteCourse(courseId);
      this.courses = this.courses.filter((course: ICourse) => course.id !== courseId);
    }
  }
}
