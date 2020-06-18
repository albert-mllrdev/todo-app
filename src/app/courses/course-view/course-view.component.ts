import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ICourse } from 'src/app/shared/interfaces';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['../../shared/component.view.css']
})

export class CourseViewComponent implements OnInit {
  course: ICourse;
  valid: boolean = true;

  constructor(private dataService: DataService, private route: ActivatedRoute, public router: Router) { }

  save() {
    this.dataService.saveCourse(this.course);
    this.router.navigate(["/courses"]);
  }

  validate() {
    this.valid = (this.course.name && this.course.name.length) ? true : false;
  }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');
    this.course = this.dataService.getCourse(id);
    this.valid = (id !== 0);
  }
}
