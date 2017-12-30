import { PropertiesFileTranslatorComponent } from './properties-file-translator.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PropertiesFileTranslatorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertiesFileTranslatorRoutingModule { }
