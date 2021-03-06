import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'fileUpload'
  },
  {
    path: 'fileUpload',
    loadChildren: 'app/properties-file-translator/properties-file-translator.module#PropertiesFileTranslatorModule'
  },
  {
    path: 'template',
    loadChildren: 'app/hien-s-template/hien-s-template.module#HienSTemplateModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
