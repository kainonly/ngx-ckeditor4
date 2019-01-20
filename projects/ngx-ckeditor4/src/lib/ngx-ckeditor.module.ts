import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxCkeditorComponent} from './component/ngx-ckeditor.component';
import {CkeditorService} from './services/ckeditor.service';
import {DynamicConfigDirective, DynamicInlineDirective} from './directives';

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
  ],
  providers: [
    CkeditorService
  ]
})
export class NgxCkeditorModule {
}
