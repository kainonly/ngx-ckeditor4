import { ModuleWithProviders, NgModule } from "@angular/core";

import { NgxCkeditorComponent } from "./ckeditor.component";
import { NgxCkeditorService } from "./ckeditor.service";
import { Option, OPTION } from "./types";

@NgModule({
  declarations: [
    NgxCkeditorComponent
  ],
  exports: [
    NgxCkeditorComponent
  ]
})
export class NgxCkeditorModule {
  static forRoot(option: Option): ModuleWithProviders<NgxCkeditorModule> {
    return {
      ngModule: NgxCkeditorModule,
      providers: [{ provide: OPTION, useValue: option }, NgxCkeditorService]
    };
  }
}
