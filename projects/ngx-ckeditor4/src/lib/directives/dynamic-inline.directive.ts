import {AfterContentInit, Directive, OnDestroy} from '@angular/core';
import {NgxCkeditorComponent} from '../component/ngx-ckeditor.component';
import {CkeditorService} from '../services/ckeditor.service';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[dynamic-inline]'
})
export class DynamicInlineDirective implements AfterContentInit, OnDestroy {
  private _inlineSubscription: Subscription;

  constructor(private ngxCkeditorComponent: NgxCkeditorComponent,
              private ckeditorService: CkeditorService) {
  }

  ngAfterContentInit() {
    this._inlineSubscription = this.ckeditorService.inline.subscribe(params => {
      if (!params.id) {
        this.ckeditorReused(params.status);
      } else {
        if (params.id === this.ngxCkeditorComponent.id) {
          this.ckeditorReused(params.status);
        }
      }
    });
  }

  ngOnDestroy() {
    this._inlineSubscription.unsubscribe();
  }

  /**
   *  Start Reused
   */
  private ckeditorReused(status: boolean) {
    this.ngxCkeditorComponent.inline = status;
    this.ngxCkeditorComponent.reusedSubscribe();
  }
}
