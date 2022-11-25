import { ModuleWithProviders, NgModule } from "@angular/core";

import { NgxCkeditorComponent } from "./ckeditor.component";
import { NgxCkeditorService } from "./ckeditor.service";
import { OPTION, Option } from "./types";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [CommonModule],
  declarations: [NgxCkeditorComponent],
  exports: [NgxCkeditorComponent]
})
export class NgxCkeditorModule {
  static forRoot(option: Option): ModuleWithProviders<NgxCkeditorModule> {
    return {
      ngModule: NgxCkeditorModule,
      providers: [{ provide: OPTION, useValue: option }, NgxCkeditorService]
    };
  }
}
