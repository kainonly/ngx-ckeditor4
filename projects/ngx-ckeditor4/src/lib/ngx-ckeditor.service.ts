import {Inject, Injectable} from '@angular/core';
import {DOCUMENT as ANGULAR_DOCUMENT} from '@angular/common';
import {NgxCkeditorOptions} from './ngx-ckeditor.options';
import {AsyncSubject, fromEvent} from 'rxjs';

declare let CKEDITOR: any;

@Injectable()
export class NgxCkeditorService {
  CKEDITOR: any;
  loaded: AsyncSubject<boolean> = new AsyncSubject();

  constructor(@Inject(ANGULAR_DOCUMENT) private document: Document,
              private options: NgxCkeditorOptions) {
  }

  loadScripts() {
    if (!this.CKEDITOR) {
      const script = this.document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', this.options.url);
      this.document.body.appendChild(script);
      fromEvent(script, 'load').subscribe(() => {
        this.CKEDITOR = CKEDITOR;
        this.loaded.next(true);
        this.loaded.complete();
      });
      fromEvent(script, 'error').subscribe(() => {
        console.warn('CKEditor load failed');
      });
    }
  }
}
