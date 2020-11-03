import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxCkeditorModule } from 'ngx-ckeditor4';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import en from '@angular/common/locales/en';


registerLocaleData(en);

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { ConfigComponent } from './config/config.component';
import { UploadComponent } from './upload/upload.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormComponent,
    ConfigComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzLayoutModule,
    NzCardModule,
    NzRadioModule,
    NzFormModule,
    NzButtonModule,
    NzDividerModule,
    NzMenuModule,
    NgxCkeditorModule.forRoot({
      url: 'https://cdn.bootcss.com/ckeditor/4.11.3/ckeditor.js',
      config: {
        filebrowserUploadMethod: 'xhr',
        filebrowserUploadUrl: 'http://127.0.0.1:8000/index/index/uploads'
      }
    }),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'config', component: ConfigComponent },
      { path: 'form', component: FormComponent },
      { path: 'upload', component: UploadComponent }
    ], { useHash: true })
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
