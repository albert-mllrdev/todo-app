import { Component, OnInit, Input } from '@angular/core';
import { FormGroup,  FormControl, Validators } from '@angular/forms';

import { CourseDataService } from 'src/app/core/data/data.course.service';
import { ICourse } from 'src/app/shared/interfaces/course';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './course.form.component.html',
  styleUrls: ['../../shared/styles/form.component.scss']
})
export class CourseFormComponent implements OnInit {
  @Input () courseId: number;
  @Input () goBackToCourses: boolean;

  profileForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required)
  });

  constructor(private courseDataService: CourseDataService, public router: Router) { }

  ngOnInit(): void {
    this.loadCourse(this.courseId);
  }

  loadCourse(courseId: number){
    if (courseId){
      this.courseDataService.getCourse(courseId).subscribe((course: ICourse) => {
        if (course){
          this.profileForm.setValue(course);
        }
      });
    }
  }

  saveCourse(){
    this.courseDataService.saveCourse(this.profileForm.value);
    if (this.goBackToCourses){
      this.router.navigate(['/courses']);
    }
  }
}
