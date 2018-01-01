import { TranslateCloudService } from './../shared/services/translate-cloud.service';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesFileTranslatorComponent } from './properties-file-translator.component';
import { LocalStorageService } from '../shared/services/local-storage.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    PropertiesFileTranslatorComponent,
  ],
  exports: [
    PropertiesFileTranslatorComponent,
  ]
})
export class PropertiesFileTranslatorModule { }