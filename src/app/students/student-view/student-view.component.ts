import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { IStudent, ICourse } from 'src/app/shared/interfaces';
import { SorterService } from 'src/app/core/sorter.service';
import { DataService } from 'src/app/core/data.service';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['../../shared/component.view.css']
})

export class StudentViewComponent implements OnInit {
  student: IStudent;
  courses: ICourse[] = [];
  valid = true;

  constructor(private dataService: DataService, private route: ActivatedRoute,
              private sorterService: SorterService, public router: Router) { }

  save() {
    this.dataService.saveStudent(this.student);
    this.router.navigate(['/students']);
  }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.dataService.getStudent(id).subscribe((student: IStudent) => {
      this.student = student;
    });

    this.dataService.getCourses().subscribe((courses: ICourse[]) => {
      this.courses = courses;
      this.sorterService.sort(this.courses, 'name', true);
      this.valid = (id !== 0);
    });
  }

  validate() {
    this.valid =
        (this.student.firstName && this.student.firstName.length &&
        this.student.lastName && this.student.lastName.length &&
        this.student.city && this.student.city.length)
        ? true : false;
  }
}
