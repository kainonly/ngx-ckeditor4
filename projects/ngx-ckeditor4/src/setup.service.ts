import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { OptionsService } from './options.service';
import { AsyncSubject, fromEvent } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

declare let CKEDITOR: any;
declare let document: Document;

@Injectable()
export class SetupService {
  /**
   * Judge loading status
   */
  loaded: AsyncSubject<boolean> = new AsyncSubject();

  /**
   * Ckeditor source object
   */
  CKEDITOR: any;

  /**
   * scripts
   */
  private elementScripts: HTMLElement;

  constructor(
    @Inject(PLATFORM_ID) platformId,
    options: OptionsService
  ) {
    if (isPlatformBrowser(platformId) && !this.elementScripts && !this.CKEDITOR) {
      this.elementScripts = document.createElement('script');
      this.elementScripts.setAttribute('type', 'text/javascript');
      this.elementScripts.setAttribute('src', options.url);
      document.body.appendChild(this.elementScripts);
      fromEvent(this.elementScripts, 'load').subscribe(() => {
        this.CKEDITOR = CKEDITOR;
        this.loaded.next(null);
        this.loaded.complete();
      });
      fromEvent(this.elementScripts, 'error').subscribe(() => {
        console.warn('CKEditor load failed');
      });
    }
  }
}
