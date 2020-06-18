import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { NavigationRoutingModule } from './navigation-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, NavigationRoutingModule],
  declarations: [NavigationComponent],
  exports: [NavigationComponent]
})
export class NavigationModule { }
