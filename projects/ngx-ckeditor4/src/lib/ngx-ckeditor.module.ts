import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxCkeditorComponent} from './component/ngx-ckeditor.component';
import {DynamicConfigDirective} from './directives/dynamic-config.directive';
import {DynamicInlineDirective} from './directives/dynamic-inline.directive';

import {OptionsService} from './services/options.service';
import {SetupService} from './services/setup.service';
import {CkeditorService} from './services/ckeditor.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxCkeditorComponent,
    DynamicConfigDirective,
    DynamicInlineDirective
  ],
  exports: [
    NgxCkeditorComponent,
    DynamicConfigDirective,
    DynamicInlineDirective
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
        CkeditorService
      ],
    };
  }

  constructor(setupService: SetupService) {
    if (!setupService.setup) {
      setupService.loadScripts();
    }
  }
}
