import {Injectable} from '@angular/core';
import {OptionsService} from './options.service';
import {AsyncSubject, fromEvent} from 'rxjs';

declare let CKEDITOR: any;
declare let document: Document;

@Injectable()
export class SetupService {
  /**
   * Used to determine whether to install
   */
  setup = false;

  /**
   * Judge loading status
   */
  loaded: AsyncSubject<boolean> = new AsyncSubject();

  /**
   * Ckeditor source object
   */
  CKEDITOR: any;

  constructor(private options: OptionsService) {
  }

  /**
   * Lazy loading ckeditor library
   */
  loadScripts() {
    if (!this.CKEDITOR) {
      this.setup = true;
      const script = document.createElement('script');
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('src', this.options.url);
      document.body.appendChild(script);
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
