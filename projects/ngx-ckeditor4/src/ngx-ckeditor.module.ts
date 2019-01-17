import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxCkeditorComponent} from './component/ngx-ckeditor.component';
import {CkeditorOptions} from './services/ckeditor.options';
import {CkeditorService} from './services/ckeditor.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgxCkeditorComponent],
  exports: [NgxCkeditorComponent]
})
export class NgxCkeditorModule {
  static forRoot(options: CkeditorOptions): ModuleWithProviders {
    return {
      ngModule: NgxCkeditorModule,
      providers: [
        {provide: CkeditorOptions, useValue: options},
        CkeditorService
      ],
    };
  }

  constructor(_ngxCkeditorService: CkeditorService) {
    if (!_ngxCkeditorService.setup) {
      _ngxCkeditorService.loadScripts();
    }
  }
}
