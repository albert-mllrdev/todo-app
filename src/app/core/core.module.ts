import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

<<<<<<< HEAD
@NgModule({
    imports: [ HttpClientModule ],
    providers: [ ]
=======
import { DataService } from './data.service';
import { SorterService } from './sorter.service';

@NgModule({
    imports: [ HttpClientModule ],
    providers: [ DataService, SorterService ]
>>>>>>> parent of c862891... updated data.service so the functions are moved into their respective places
})
export class CoreModule { }
