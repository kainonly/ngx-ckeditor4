import {Directive} from '@angular/core';
import {NgxCkeditorComponent} from '../component/ngx-ckeditor.component';

@Directive({
  selector: '[dynamic-inline]'
})
export class DynamicInlineDirective {
  constructor(private _ngxCkeditorComponent: NgxCkeditorComponent) {
  }
}
