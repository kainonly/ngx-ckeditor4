import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxCkeditorComponent} from './component/ngx-ckeditor.component';

import {OptionsService} from './services/options.service';
import {SetupService} from './services/setup.service';

@NgModule({
  imports: [
    CommonModule
  ],
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
        {provide: OptionsService, useValue: options},
        SetupService,
      ],
    };
  }

  constructor(setupService: SetupService) {
    if (!setupService.setup) {
      setupService.loadScripts();
    }
  }
}
