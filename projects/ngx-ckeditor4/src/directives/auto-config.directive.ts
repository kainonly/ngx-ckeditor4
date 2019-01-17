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
    this._ckeditorService._config.subscribe(params => {
      if (!params.id) {
        this.ckeditorReused(params.config);
      } else {
        if (params.id === this._ngxCkeditorComponent.id) {
          this.ckeditorReused(params.config);
        }
      }
    });
  }

  /**
   *  Start Reused
   */
  private ckeditorReused(config: any) {
    this._ngxCkeditorComponent.config = config;
    this._ngxCkeditorComponent.reusedSubscribe();
  }
}
