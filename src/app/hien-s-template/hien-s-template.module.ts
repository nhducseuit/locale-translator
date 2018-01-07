import { HienSTemplateRoutingModule } from './hien-s-template-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HienSTemplateComponent } from './hien-s-template.component';

@NgModule({
  imports: [
    CommonModule,
    HienSTemplateRoutingModule
  ],
  declarations: [HienSTemplateComponent]
})
export class HienSTemplateModule { }