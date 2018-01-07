import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressBarModule, MatSelectModule, MatTableModule, MatIconModule } from '@angular/material';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateCloudService } from './services/translate-cloud.service';
import { LocalStorageService } from './services/local-storage.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconRegistryService } from './services/icon-registry.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
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
    MatTableModule,
    MatIconModule,
  ],
  providers: [
    LocalStorageService,
    TranslateCloudService,
    IconRegistryService,
  ]
})
export class SharedModule { }