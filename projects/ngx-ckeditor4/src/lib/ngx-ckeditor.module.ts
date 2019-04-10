import {ModuleWithProviders, NgModule, Renderer2} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxCkeditorComponent} from './ngx-ckeditor.component';

import {OptionsService} from './options.service';
import {SetupService} from './setup.service';

@NgModule({
  imports: [],
  declarations: [
    NgxCkeditorComponent
  ],
  exports: [
    NgxCkeditorComponent
  ]
})
export class NgxCkeditorModule {
  /**
   * Set Module
   */
  static forRoot(options: any): ModuleWithProviders<NgxCkeditorModule> {
    return {
      ngModule: NgxCkeditorModule,
      providers: [
        SetupService,
        {provide: OptionsService, useValue: options},
      ],
    };
  }
}
