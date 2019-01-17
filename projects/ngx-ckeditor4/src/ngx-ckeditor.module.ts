import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxCkeditorComponent} from './component/ngx-ckeditor.component';
import {OptionsService} from './services/options.service';
import {SetupService} from './services/setup.service';
import {CkeditorService} from './services/ckeditor.service';
import {DynamicConfigDirective} from './directives';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NgxCkeditorComponent,
    DynamicConfigDirective
  ],
  exports: [
    NgxCkeditorComponent,
    DynamicConfigDirective
  ]
})
export class NgxCkeditorModule {
  static forRoot(options: OptionsService): ModuleWithProviders {
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
