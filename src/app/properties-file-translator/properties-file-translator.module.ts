import { TranslateCloudService } from './../shared/services/translate-cloud.service';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesFileTranslatorComponent } from './properties-file-translator.component';
import { PropertiesFileTranslatorRoutingModule } from 'app/properties-file-translator/properties-file-translator-routing.module';
import { LocalStorageService } from '../shared/services/local-storage.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PropertiesFileTranslatorRoutingModule
  ],
  declarations: [
    PropertiesFileTranslatorComponent,
  ],
  exports: [
    PropertiesFileTranslatorComponent,
  ]
})
export class PropertiesFileTranslatorModule { }