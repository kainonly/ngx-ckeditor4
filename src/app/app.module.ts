import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgxCkeditorModule } from "ngx-ckeditor4";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgZorroAntdModule, NZ_I18N, en_US } from "ng-zorro-antd";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { registerLocaleData } from "@angular/common";
import { RouterModule } from "@angular/router";
import en from "@angular/common/locales/en";


registerLocaleData(en);

import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { FormComponent } from "./form/form.component";
import { ConfigComponent } from "./config/config.component";
import { UploadComponent } from "./upload/upload.component";

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
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxCkeditorModule.forRoot({
      url: "https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/ckeditor/4.17.2/ckeditor.js",
      config: {
        filebrowserUploadMethod: "xhr",
        filebrowserUploadUrl: "http://127.0.0.1:8000/index/index/uploads"
      }
    }),
    RouterModule.forRoot([
      { path: "", component: HomeComponent },
      { path: "config", component: ConfigComponent },
      { path: "form", component: FormComponent },
      { path: "upload", component: UploadComponent }
    ], { useHash: true })
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
