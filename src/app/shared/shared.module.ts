import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatSelectModule } from '@angular/material';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateCloudService } from './services/translate-cloud.service';
import { LocalStorageService } from './services/local-storage.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
  ],
  declarations: [
    FileUploadComponent,
  ],
  exports:[
    FileUploadComponent,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
  ],
  providers: [
    LocalStorageService,
    TranslateCloudService,
  ]
})
export class SharedModule { }