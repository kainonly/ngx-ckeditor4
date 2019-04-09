import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {isObject} from 'util';
import {AsyncSubject, Subject} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';

import {SetupService} from '../services/setup.service';
import {OptionsService} from '../services/options.service';
import {EventInfo} from '../types/eventInfo';


@Component({
  selector: 'ngx-ckeditor',
  templateUrl: './ngx-ckeditor.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxCkeditorComponent),
      multi: true,
    },
  ],
})
export class NgxCkeditorComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('editor') editorRef: ElementRef;

  @Input() id: string;
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

  constructor(private setupService: SetupService,
              private optionsService: OptionsService) {
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

  ngOnDestroy() {
    this.editorDestroy();
  }

  /**
   * form write value
   */
  writeValue(value: string) {
    if (!value) {
      return;
    }
    this.editorReady.subscribe(status => {
      if (status) {
        this.editor.setData(value);
      }
    });
  }

  registerOnChange(fn: (_: any) => {}) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}) {
    this.onTouched = fn;
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
  }

  /**
   * Load ckeditor
   */
  private editorFactory() {
    this.setupService.loaded.subscribe(() => {
      if (!this.inline) {
        this.setupService.CKEDITOR.disableAutoInline = false;
        this.editor = this.setupService.CKEDITOR.replace(this.editorRef.nativeElement, this.config);
      } else {
        this.setupService.CKEDITOR.disableAutoInline = true;
        this.editor = this.setupService.CKEDITOR.inline(this.editorRef.nativeElement, this.config);
      }

      this.editor.on('instanceReady', (event) => {
        this.ready.emit(event);
        this.editorReady.next(true);
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
        this.onTouched();
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
}
