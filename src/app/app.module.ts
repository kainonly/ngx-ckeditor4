import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgxCkeditorModule} from 'ngx-ckeditor4';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule, NZ_I18N, en_US} from 'ng-zorro-antd';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';

registerLocaleData(en);

import {AppComponent} from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxCkeditorModule.forRoot({
      url: 'https://cdn.bootcss.com/ckeditor/4.11.1/ckeditor.js'
    })
  ],
  providers: [{provide: NZ_I18N, useValue: en_US}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
