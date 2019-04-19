import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgxCkeditorModule, CkeditorOptions} from 'ngx-ckeditor4';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule, NZ_I18N, en_US} from 'ng-zorro-antd';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {registerLocaleData} from '@angular/common';
import {RouterModule} from '@angular/router';
import en from '@angular/common/locales/en';


registerLocaleData(en);

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {FormComponent} from './form/form.component';
import {ConfigComponent} from './config/config.component';
import {UploadComponent} from './upload/upload.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormComponent,
    ConfigComponent,
    UploadComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxCkeditorModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'config', component: ConfigComponent},
      {path: 'form', component: FormComponent},
      {path: 'upload', component: UploadComponent},
    ], {useHash: true})
  ],
  providers: [
    {
      provide: CkeditorOptions, useValue: {
        url: 'https://cdn.bootcss.com/ckeditor/4.11.3/ckeditor.js',
        config: {
          filebrowserUploadMethod: 'xhr',
          filebrowserUploadUrl: 'http://127.0.0.1:8000/index/index/uploads',
        },
        fileUploadRequest(event) {
          try {
            const fileLoader = event.data.fileLoader;
            const formData = new FormData();
            const xhr = fileLoader.xhr;
            xhr.withCredentials = true;
            xhr.open('POST', fileLoader.uploadUrl, true);
            formData.append('image', fileLoader.file, fileLoader.fileName);
            fileLoader.xhr.send(formData);
            event.stop();
          } catch (e) {
            console.warn(e);
          }
        },
        fileUploadResponse(event) {
          try {
            event.stop();
            const data = event.data;
            const xhr = data.fileLoader.xhr;
            const response = JSON.parse(xhr.responseText);
            if (response.error) {
              data.message = 'upload fail';
              event.cancel();
            } else {
              data.url = 'http://127.0.0.1:8000/uploads/' + response.data.save_name;
            }
          } catch (e) {
            console.warn(e);
          }
        }
      }
    },
    {provide: NZ_I18N, useValue: en_US}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
