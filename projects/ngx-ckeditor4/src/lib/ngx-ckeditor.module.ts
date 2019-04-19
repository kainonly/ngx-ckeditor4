import {NgModule, Renderer2} from '@angular/core';

import {NgxCkeditorComponent} from './ngx-ckeditor.component';
import {CkeditorOptions} from './ckeditor.options';
import {SetupService} from './setup.service';

@NgModule({
  declarations: [
    NgxCkeditorComponent
  ],
  exports: [
    NgxCkeditorComponent
  ],
  providers: [
    SetupService,
    CkeditorOptions
  ]
})
export class NgxCkeditorModule {
  constructor(setupService: SetupService) {
    if (!setupService.setup.getValue()) {
      setupService.loadScripts();
    }
  }
}
