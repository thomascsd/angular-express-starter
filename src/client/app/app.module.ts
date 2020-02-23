import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { DynamicFormBuilder } from 'ngx-dynamic-form-builder';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactComponent } from './contact/contact.component';
import { MaterialModule } from './material/material.module';
import { ValidationsModule } from './validations/validations.module';

@NgModule({
  declarations: [AppComponent, LayoutComponent, ContactComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    ValidationsModule
  ],
  providers: [{ provide: DynamicFormBuilder, useClass: DynamicFormBuilder }],
  bootstrap: [AppComponent]
})
export class AppModule {}
