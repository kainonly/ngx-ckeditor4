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

import {NgxCkeditorModule, OptionsService, SetupService} from 'dev-ngx-ckeditor4';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ExampleComponent} from './example/example.component';
import {MarkdownModule} from 'ngx-markdown';
import {ReusedComponent} from './reused/reused.component';
import {DynamicConfigComponent} from './dynamic-config/dynamic-config.component';
import {InlineComponent} from './inline/inline.component';
import {UploadsComponent} from './uploads/uploads.component';
import {DynamicInlineComponent} from './dynamic-inline/dynamic-inline.component';
import {ApiComponent} from './api/api.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExampleComponent,
    ReusedComponent,
    DynamicConfigComponent,
    InlineComponent,
    DynamicInlineComponent,
    ApiComponent,
    UploadsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule,
    MarkdownModule.forRoot({loader: HttpClient}),
    NgxCkeditorModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'example', component: ExampleComponent},
      {path: 'reused', component: ReusedComponent},
      {path: 'dynamic-config', component: DynamicConfigComponent},
      {path: 'inline', component: InlineComponent},
      {path: 'dynamic-inline', component: DynamicInlineComponent},
      {path: 'uploads', component: UploadsComponent},
      {path: 'api', component: ApiComponent}
    ], {useHash: true})
  ],
  providers: [
    {
      provide: OptionsService, useValue: {
        url: 'https://cdn.bootcss.com/ckeditor/4.11.1/ckeditor.js'
      }
    },
    SetupService,
    {provide: NZ_I18N, useValue: zh_CN}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(_setupService: SetupService) {
    if (!_setupService.setup) {
      _setupService.loadScripts();
    }
  }
}
