import {AfterContentInit, Directive, OnDestroy} from '@angular/core';
import {NgxCkeditorComponent} from '../component/ngx-ckeditor.component';
import {CkeditorService} from '../services/ckeditor.service';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[dynamic-inline]'
})
export class DynamicInlineDirective implements AfterContentInit, OnDestroy {
  private _inlineSubscription: Subscription;

  constructor(private _ngxCkeditorComponent: NgxCkeditorComponent,
              private _ckeditorService: CkeditorService) {
  }

  ngAfterContentInit() {
    this._inlineSubscription = this._ckeditorService._inline.subscribe(params => {
      if (!params.id) {
        this.ckeditorReused(params.status);
      } else {
        if (params.id === this._ngxCkeditorComponent.id) {
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
    this._ngxCkeditorComponent.inline = status;
    this._ngxCkeditorComponent.reusedSubscribe();
  }
}

