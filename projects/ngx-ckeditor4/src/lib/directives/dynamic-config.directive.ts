import {AfterContentInit, Directive, OnDestroy} from '@angular/core';
import {NgxCkeditorComponent} from '../component/ngx-ckeditor.component';
import {CkeditorService} from '../services/ckeditor.service';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[dynamic-config]'
})
export class DynamicConfigDirective implements AfterContentInit, OnDestroy {
  private _configSubscription: Subscription;

  constructor(private ngxCkeditorComponent: NgxCkeditorComponent,
              private ckeditorService: CkeditorService) {
  }

  ngAfterContentInit() {
    this._configSubscription = this.ckeditorService.config.subscribe(params => {
      if (!params.id) {
        this.ckeditorReused(params.config);
      } else {
        if (params.id === this.ngxCkeditorComponent.id) {
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
    this.ngxCkeditorComponent.config = config;
    this.ngxCkeditorComponent.reusedSubscribe();
  }
}
