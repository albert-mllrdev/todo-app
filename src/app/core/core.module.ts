import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { SorterService } from './sorter.service';
import { StudentDataService } from './data/students.services';
import { CoursesDataService } from './data/courses.services';
import { DataService } from './data.service';

@NgModule({
    imports: [ HttpClientModule ],
    providers: [ SorterService, DataService, StudentDataService, CoursesDataService ]
})
export class CoreModule { }
