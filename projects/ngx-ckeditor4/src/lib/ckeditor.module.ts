import { ModuleWithProviders, NgModule } from "@angular/core";

import { CkeditorComponent } from "./ckeditor.component";
import { CkeditorService } from "./ckeditor.service";
import { OPTION, Option } from "./types";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [CommonModule],
  declarations: [CkeditorComponent],
  exports: [CkeditorComponent]
})
export class CkeditorModule {
  static forRoot(option: Option): ModuleWithProviders<CkeditorModule> {
    return {
      ngModule: CkeditorModule,
      providers: [{ provide: OPTION, useValue: option }, CkeditorService]
    };
  }
}
