import { Component, OnInit, Input } from '@angular/core';
import { FormGroup,  FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { StudentDataService } from 'src/app/core/data/data.student.service';
import { CourseDataService } from 'src/app/core/data/data.course.service';
import { ICourse } from '@interfaces/course';
import { IStudent } from '@interfaces/student';

@Component({
  selector: 'app-student-form',
  templateUrl: './student.form.component.html',
  styleUrls: ['../../shared/styles/form.component.scss']
})
export class StudentFormComponent implements OnInit {
  @Input () studentId: number;
  @Input () goBackToStudents: boolean;

  profileForm = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    courseId: new FormControl(''),
  });

  courses: ICourse[] = [];

  constructor(private studentDataService: StudentDataService, private courseDataService: CourseDataService, public router: Router) { }

  ngOnInit(): void {
    this.loadStudent(this.studentId);
    this.loadCourses();
  }

  loadCourses(){
    this.courseDataService.getCourses().subscribe((courses: ICourse[]) => {
      this.courses = courses;
    });
  }

  loadStudent(studentId: number){
    if (studentId){
      this.studentDataService.getStudent(studentId).subscribe((student: IStudent) => {
        if (student){
          this.profileForm.setValue(student);
        }
      });
    }
  }

  saveStudent(){
    this.studentDataService.saveStudent(this.profileForm.value);
    if (this.goBackToStudents){
      this.router.navigate(['/students']);
    }
  }
}
