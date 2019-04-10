import {Injectable, Renderer2} from '@angular/core';
import {OptionsService} from './options.service';
import {AsyncSubject, BehaviorSubject, fromEvent} from 'rxjs';

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

  constructor(private options: OptionsService) {
  }

  /**
   * Lazy loading ckeditor library
   */
  loadScripts(render: Renderer2) {
    if (!this.elementScripts && !this.CKEDITOR) {
      this.setup.next(true);
      this.elementScripts = render.createElement('script');
      render.setAttribute(this.elementScripts, 'type', 'text/javascript');
      render.setAttribute(this.elementScripts, 'src', this.options.url);
      render.appendChild(document.body, this.elementScripts);
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
