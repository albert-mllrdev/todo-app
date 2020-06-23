import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-course-view',
  templateUrl: './course.view.component.html'
})

export class CourseViewComponent implements OnInit {
  courseId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.courseId = +this.route.snapshot.paramMap.get('courseId');
  }
}
