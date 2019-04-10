import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {isObject} from 'util';
import {AsyncSubject, Subject} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import {SetupService} from './setup.service';
import {OptionsService} from './options.service';
import {EventInfo} from './eventInfo';

@Component({
  selector: 'ngx-ckeditor',
  template: `<textarea #htmlTextAreaElement [id]="id"></textarea>`,
  styles: [`textarea {
    display: none;
  }`],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxCkeditorComponent),
      multi: true,
    },
  ],
})
export class NgxCkeditorComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('htmlTextAreaElement') htmlTextAreaElement: ElementRef;

  @Input() id: string;
  @Input() locale: string;
  @Input() config: any = {};
  @Input() inline: boolean;

  @Output() ready: EventEmitter<EventInfo> = new EventEmitter();
  @Output() focus: EventEmitter<EventInfo> = new EventEmitter();
  @Output() blur: EventEmitter<EventInfo> = new EventEmitter();
  @Output() fileUploadRequest: EventEmitter<EventInfo> = new EventEmitter();
  @Output() fileUploadResponse: EventEmitter<EventInfo> = new EventEmitter();

  private editor: any;
  private editorReady: AsyncSubject<boolean> = new AsyncSubject();
  private editorChangeEvents: Subject<any> = new Subject();
  private onChange: (HTMLRows: string) => void;
  private onTouched: () => void;
  private disabled: boolean;

  constructor(private setupService: SetupService,
              private optionsService: OptionsService,
              private render: Renderer2) {
    if (!setupService.setup.getValue()) {
      setupService.loadScripts(render);
    }
  }

  /**
   * Writes a new value to the element.
   */
  writeValue(value: string) {
    if (!value) {
      return;
    }
    this.editorReady.subscribe(() => {
      this.editor.setData(value);
    });
  }

  /**
   * Registers a callback function that is called when the control's value changes in the UI.
   */
  registerOnChange(fn: (_: any) => {}) {
    this.onChange = fn;
  }

  /**
   * Registers a callback function is called by the forms API on initialization to update the form model on blur.
   */
  registerOnTouched(fn: () => {}) {
    this.onTouched = fn;
  }

  /**
   * Function that is called by the forms API when the control status changes to or from 'DISABLED'.
   */
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this.editorReady.subscribe(() => {
      this.editor.setReadOnly(this.disabled);
    });
  }

  ngOnInit() {
    this.editorInitial();
    this.editorChangeEvents.pipe(
      debounceTime(200),
      map((event: any) => event.editor.getData())
    ).subscribe(html => {
      if (this.onChange) {
        const HTMLRows = html.replace(/\n/g, '');
        this.onChange(HTMLRows);
      }
    });
  }

  ngAfterViewInit() {
    this.editorFactory();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('inline') && !changes.inline.firstChange) {
      this.inline = changes.inline.currentValue;
      this.update();
    }
    if (changes.hasOwnProperty('locale') && !changes.locale.firstChange) {
      this.setLanguage(changes.locale.currentValue);
      this.update();
    }
    if (changes.hasOwnProperty('config') && !changes.config.firstChange) {
      delete this.config.language;
      this.config = changes.config.currentValue;
      this.update();
    }
  }

  ngOnDestroy() {
    this.editorDestroy();
  }

  /**
   * Update Ckeditor
   */
  private update() {
    this.editorDestroy();
    this.editorReady = new AsyncSubject();
    this.editorChangeEvents = new Subject();
    this.editorInitial();
    this.editorFactory();
  }

  /**
   * Initial the configuration of ckeditor
   */
  private editorInitial() {
    if (!this.id) {
      this.id = 'ckeditor_' + (Math.random() * 10000).toFixed(0);
    }

    if (this.optionsService.config && isObject(this.optionsService.config)) {
      Object.assign(this.config, this.optionsService.config);
    }

    if (this.locale) {
      this.setLanguage(this.locale);
    }
  }

  /**
   * Load ckeditor
   */
  private editorFactory() {
    this.setupService.loaded.subscribe(() => {
      if (!this.inline) {
        this.setupService.CKEDITOR.disableAutoInline = false;
        this.editor = this.setupService.CKEDITOR.replace(this.htmlTextAreaElement.nativeElement, this.config);
      } else {
        this.setupService.CKEDITOR.disableAutoInline = true;
        this.editor = this.setupService.CKEDITOR.inline(this.htmlTextAreaElement.nativeElement, this.config);
      }

      if (this.disabled !== undefined) {
        this.editor.config.readOnly = this.disabled;
      }

      this.editor.on('instanceReady', (event) => {
        this.ready.emit(event);
        this.editorReady.next(null);
        this.editorReady.complete();
      });

      this.editor.on('change', (event) => {
        this.editorChangeEvents.next(event);
      });

      this.editor.on('focus', (event) => {
        this.focus.emit(event);
      });

      this.editor.on('blur', (event) => {
        this.blur.emit(event);
        if (this.onTouched) {
          this.onTouched();
        }
      });

      this.editor.on('fileUploadRequest', (event) => {
        this.fileUploadRequest.emit(event);
      });

      this.editor.on('fileUploadResponse', (event) => {
        this.fileUploadResponse.emit(event);
      });
    });
  }

  /**
   * Destroy ckeditor
   */
  private editorDestroy() {
    if (this.editor) {
      this.editor.destroy();
      this.editor = null;
      this.editorReady.unsubscribe();
      this.editorChangeEvents.unsubscribe();
    }
  }

  private setLanguage(locale: string) {
    switch (locale) {
      case 'en_us':
        this.config.language = 'en';
        break;
      case 'zh_cn':
        this.config.language = 'zh-CN';
        break;
    }
  }
}
