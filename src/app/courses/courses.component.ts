import { Component, OnInit } from '@angular/core';

import { CourseDataService } from '../core/data/data.course.service';
import { ICourse } from '@interfaces/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html'
})

export class CoursesComponent implements OnInit {
  courses: ICourse[] = [];

  constructor(private courseDataService: CourseDataService) { }

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses(){
    this.courseDataService.getCourses().subscribe((courses: ICourse[]) => {
      this.courses = courses;
    });
  }
}
