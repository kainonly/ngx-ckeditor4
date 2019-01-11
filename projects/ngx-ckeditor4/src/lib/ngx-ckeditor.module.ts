import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxCkeditorComponent} from './ngx-ckeditor.component';
import {NgxCkeditorOptions} from './ngx-ckeditor.options';
import {NgxCkeditorService} from './ngx-ckeditor.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgxCkeditorComponent],
  exports: [NgxCkeditorComponent]
})
export class NgxCkeditorModule {
  static forRoot(options: NgxCkeditorOptions): ModuleWithProviders {
    return {
      ngModule: NgxCkeditorModule,
      providers: [
        {provide: NgxCkeditorOptions, useValue: options},
        NgxCkeditorService
      ],
    };
  }

  constructor(_ngxCkeditorService: NgxCkeditorService) {
    _ngxCkeditorService.loadScripts();
  }
}
