import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-student-view',
  templateUrl: './student.view.component.html'
})

export class StudentViewComponent implements OnInit {
  studentId: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.studentId = +this.route.snapshot.paramMap.get('studentId');
  }
}
