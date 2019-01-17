import {AfterViewInit, Directive} from '@angular/core';
import {NgxCkeditorComponent} from '../component/ngx-ckeditor.component';
import {CkeditorService} from '../services/ckeditor.service';

@Directive({
  selector: '[auto-config]'
})
export class AutoConfigDirective implements AfterViewInit {

  constructor(private _ngxCkeditorComponent: NgxCkeditorComponent,
              private _ckeditorService: CkeditorService) {
  }

  ngAfterViewInit() {
    this._ckeditorService.onConfig().subscribe(config => {

    });
  }

}
