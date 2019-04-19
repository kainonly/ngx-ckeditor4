import {Injectable, Renderer2} from '@angular/core';
import {CkeditorOptions} from './ckeditor.options';
import {AsyncSubject, BehaviorSubject, fromEvent} from 'rxjs';
import {createElement} from '@angular/core/src/view/element';

declare let CKEDITOR: any;
declare let document: Document;

@Injectable()
export class SetupService {
  /**
   * Used to determine whether to install
   */
  setup: BehaviorSubject<boolean> = new BehaviorSubject(false);

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

  constructor(private options: CkeditorOptions) {
  }

  /**
   * Lazy loading ckeditor library
   */
  loadScripts() {
    if (!this.elementScripts && !this.CKEDITOR) {
      this.setup.next(true);

      this.elementScripts = document.createElement('script');
      this.elementScripts.setAttribute('type', 'text/javascript');
      this.elementScripts.setAttribute('src', this.options.url);
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
