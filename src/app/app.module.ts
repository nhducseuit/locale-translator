import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PropertiesFileTranslatorModule } from './properties-file-translator/properties-file-translator.module';

@NgModule({
  declarations: [
    AppComponent
],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PropertiesFileTranslatorModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
