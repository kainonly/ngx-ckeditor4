import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxCkeditorComponent} from './component/ngx-ckeditor.component';
import {OptionsService} from './services/options.service';
import {SetupService} from './services/setup.service';
import {CkeditorService} from './services/ckeditor.service';
import {DynamicConfigDirective} from './directives/dynamic-config.directive';
import {DynamicInlineDirective} from './directives/dynamic-inline.directive';

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

  constructor(_setupService: SetupService) {
    if (!_setupService.setup) {
      _setupService.loadScripts();
    }
  }
}
