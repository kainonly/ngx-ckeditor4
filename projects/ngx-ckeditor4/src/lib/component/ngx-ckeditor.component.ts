import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {isObject} from 'util';
import {AsyncSubject, Observable} from 'rxjs';
import {SetupService} from '../services/setup.service';
import {OptionsService} from '../services/options.service';
import {CkeditorService} from '../services/ckeditor.service';
import {EventInfo} from '../types/eventInfo';

@Component({
  selector: 'ngx-ckeditor',
  templateUrl: './ngx-ckeditor.component.html',
  styleUrls: ['./ngx-ckeditor.component.scss'],
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

  @Output() ready: EventEmitter<any> = new EventEmitter();
  @Output() focus: EventEmitter<any> = new EventEmitter();
  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Output() fileUploadRequest: EventEmitter<EventInfo> = new EventEmitter();
  @Output() fileUploadResponse: EventEmitter<EventInfo> = new EventEmitter();

  private editor: any;
  private instanceReady: AsyncSubject<boolean> = new AsyncSubject();
  private editorChange: (value: string) => void;
  private editorTouched: () => void;

  constructor(private setupService: SetupService,
              private optionsService: OptionsService,
              private ckeditorService: CkeditorService,
              private zone: NgZone) {
  }

  ngOnInit() {
    this.randomId();
    this.initConfig();
  }

  ngAfterViewInit() {
    this.factory();
  }

  ngOnDestroy() {
    this.destroy();
  }

  writeValue(value: string) {
    if (!value) {
      return;
    }
    this.instanceReady.subscribe(status => {
      if (status) {
        console.log(value);
        this.editor.setData(value);
      }
    });
  }

  registerOnChange(fn: (_: any) => {}) {
    this.editorChange = fn;
  }

  registerOnTouched(fn: () => {}) {
    this.editorTouched = fn;
  }

  /**
   *  Ckeditor reused
   */
  reused(delay = 0): Observable<boolean> {
    return Observable.create(observer => {
      setTimeout(() => {
        this.destroy();
        this.randomId();
        this.initConfig();
        this.factory();
        observer.next(true);
        observer.complete();
      }, delay);
    });
  }

  /**
   *  Ckeditor reused subscription
   */
  reusedSubscribe(delay = 0) {
    this.reused(delay).subscribe(
      () => {
      },
      () => {
      }
    );
  }

  /**
   * Randomly set the id of the ckeditor
   */
  private randomId() {
    if (!this.id) {
      this.id = 'ckeditor_' + (Math.random() * 10000).toFixed(0);
    }
  }

  /**
   * Initial the configuration of ckeditor
   */
  private initConfig() {
    if (this.optionsService.config && isObject(this.optionsService.config)) {
      Object.assign(this.config, this.optionsService.config);
    }
  }

  /**
   * Load ckeditor
   */
  private factory() {
    this.setupService.loaded.subscribe(() => {
      if (!this.inline) {
        this.setupService.CKEDITOR.disableAutoInline = false;
        this.editor = this.setupService.CKEDITOR.replace(this.editorRef.nativeElement, this.config);
      } else {
        this.setupService.CKEDITOR.disableAutoInline = true;
        this.editor = this.setupService.CKEDITOR.inline(this.editorRef.nativeElement, this.config);
      }
      this.bindEvents();
    });
  }

  /**
   * Binding ckeditor event
   */
  private bindEvents() {
    this.editor.on('instanceReady', (event) => {
      this.ready.emit(event);
      this.instanceReady.next(true);
      this.instanceReady.complete();
    });
    this.editor.on('change', () => {
      this.editorChange(this.editor.getData());
    });
    this.editor.on('focus', (event) => {
      this.focus.emit(event);
    });
    this.editor.on('blur', (event) => {
      this.blur.emit(event);
      this.editorTouched();
    });
    this.editor.on('fileUploadRequest', (event) => {
      this.fileUploadRequest.emit(event);
    });
    this.editor.on('fileUploadResponse', (event) => {
      this.fileUploadResponse.emit(event);
    });
  }

  /**
   * Destroy ckeditor
   */
  private destroy() {
    if (this.editor) {
      this.editor.destroy();
      this.editor = null;
      this.instanceReady.unsubscribe();
    }
  }
}
