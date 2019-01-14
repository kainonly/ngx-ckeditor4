import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

import {NgxCkeditorModule} from 'dev-ngx-ckeditor4';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ExampleComponent} from './example/example.component';
import {MarkdownModule} from 'ngx-markdown';
import {ReusedComponent} from './reused/reused.component';
import {InlineComponent} from './inline/inline.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExampleComponent,
    ReusedComponent,
    InlineComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    MarkdownModule.forRoot({loader: HttpClient}),
    NgxCkeditorModule.forRoot({
      url: 'https://cdn.bootcss.com/ckeditor/4.11.1/ckeditor.js'
    }),
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'example', component: ExampleComponent},
      {path: 'reused', component: ReusedComponent},
      {path: 'inline', component: InlineComponent}
    ], {useHash: true})
  ],
  providers: [{provide: NZ_I18N, useValue: zh_CN}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
