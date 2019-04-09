import {AfterContentInit, AfterViewInit, Directive, OnDestroy} from '@angular/core';
import {NgxCkeditorComponent} from '../component/ngx-ckeditor.component';
import {CkeditorService} from '../services/ckeditor.service';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[ckDynamicConfig]'
})
export class DynamicConfigDirective implements AfterViewInit, OnDestroy {
  private configSubscription: Subscription;

  constructor(private ngxCkeditorComponent: NgxCkeditorComponent,
              private ckeditorService: CkeditorService) {
  }

  ngAfterViewInit() {
    this.configSubscription = this.ckeditorService.config.subscribe(params => {
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
    this.configSubscription.unsubscribe();
  }

  /**
   *  Start Reused
   */
  private ckeditorReused(config: any) {
    this.ngxCkeditorComponent.config = config;
    // this.ngxCkeditorComponent.reusedSubscribe();
  }
}
