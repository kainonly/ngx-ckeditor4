import {Injectable} from '@angular/core';
import {OptionsService} from './options.service';
import {AsyncSubject, BehaviorSubject, fromEvent} from 'rxjs';

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

  /**
   * scripts
   */
  private elementScripts: HTMLElement;

  constructor(private options: OptionsService) {
  }

  /**
   * Lazy loading ckeditor library
   */
  loadScripts() {
    if (!this.elementScripts && !this.CKEDITOR) {
      this.setup = true;

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
