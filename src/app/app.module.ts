import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {NgxCkeditorModule} from 'dev-ngx-ckeditor4';

registerLocaleData(zh);

import {AppComponent} from './app.component';
import {BasicComponent} from './basic/basic.component';
import {StandardComponent} from './standard/standard.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    StandardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    NgxCkeditorModule.forRoot({
      url: './assets/ckeditor/ckeditor.js'
    }),
    RouterModule.forRoot([
      {path: '', component: BasicComponent},
      {path: 'standard', component: StandardComponent}
    ], {useHash: true})
  ],
  providers: [{provide: NZ_I18N, useValue: zh_CN}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
