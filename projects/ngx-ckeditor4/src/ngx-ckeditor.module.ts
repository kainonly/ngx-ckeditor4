import { ModuleWithProviders, NgModule } from '@angular/core';

import { NgxCkeditorComponent } from './ngx-ckeditor.component';
import { OptionsService } from './options.service';
import { SetupService } from './setup.service';
import { CkeditorService } from './ckeditor.service';

@NgModule({
  declarations: [
    NgxCkeditorComponent
  ],
  exports: [
    NgxCkeditorComponent
  ]
})
export class NgxCkeditorModule {
  static forRoot(options: any): ModuleWithProviders<NgxCkeditorModule> {
    return {
      ngModule: NgxCkeditorModule,
      providers: [
        SetupService,
        CkeditorService,
        { provide: OptionsService, useValue: options }
      ]
    };
  }
}
