import {AfterViewInit, Directive, OnDestroy} from '@angular/core';
import {NgxCkeditorComponent} from '../component/ngx-ckeditor.component';
import {CkeditorService} from '../services/ckeditor.service';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[dynamic-config]'
})
export class DynamicConfigDirective implements AfterViewInit, OnDestroy {
  private _configSubscription: Subscription;

  constructor(private _ngxCkeditorComponent: NgxCkeditorComponent,
              private _ckeditorService: CkeditorService) {
  }

  ngAfterViewInit() {
    this._configSubscription = this._ckeditorService._config.subscribe(params => {
      if (!params.id) {
        this.ckeditorReused(params.config);
      } else {
        if (params.id === this._ngxCkeditorComponent.id) {
          this.ckeditorReused(params.config);
        }
      }
    });
  }

  ngOnDestroy() {
    this._configSubscription.unsubscribe();
  }

  /**
   *  Start Reused
   */
  private ckeditorReused(config: any) {
    this._ngxCkeditorComponent.config = config;
    this._ngxCkeditorComponent.reusedSubscribe();
  }
}
