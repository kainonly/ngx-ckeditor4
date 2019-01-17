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
import {Observable, Subject} from 'rxjs';
import {SetupService} from '../services/setup.service';
import {OptionsService} from '../services/options.service';
import {CkeditorService} from '../services/ckeditor.service';
import {EventInfo} from '../types';

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
  @Input() id: string;
  @Input() config: any = {};
  @Input() inline: boolean;

  @Output() ready: EventEmitter<any> = new EventEmitter();
  @Output() focus: EventEmitter<any> = new EventEmitter();
  @Output() blur: EventEmitter<any> = new EventEmitter();
  @Output() destroy: EventEmitter<any> = new EventEmitter();
  @Output() fileUploadRequest: EventEmitter<EventInfo> = new EventEmitter();
  @Output() fileUploadResponse: EventEmitter<EventInfo> = new EventEmitter();

  @ViewChild('editor') editorRef: ElementRef;

  private _editor: any;
  private _value: string;
  private _onchange: (value: string) => void;
  private _ontouched: () => void;

  constructor(private _setupService: SetupService,
              private _optionsService: OptionsService,
              private _ckeditorService: CkeditorService,
              private _zone: NgZone) {
  }

  writeValue(value: string) {
    this._value = value || '';
    if (this._editor) {
      this._editor.setData(this._value);
      const val = this._editor.getData();
      this._editor.setData(val);
    }
  }

  registerOnChange(fn: (_: any) => {}) {
    this._onchange = fn;
  }

  registerOnTouched(fn: () => {}) {
    this._ontouched = fn;
  }

  ngOnInit() {
    this._setRandomId();
    this._initConfig();
  }

  ngAfterViewInit() {
    this._factory();
    this._ckeditorService.reuse.subscribe(number => {
      console.log(number);
      this.reused(number);
    });
  }

  ngOnDestroy() {
    this._destroy();
  }

  reused(delay = 0): Observable<boolean> {
    return Observable.create(observer => {
      setTimeout(() => {
        this._destroy();
        this._setRandomId();
        this._initConfig();
        this._factory();
        observer.next(true);
        observer.complete();
      }, delay);
    });
  }

  private _setRandomId() {
    if (!this.id) {
      this.id = 'ckeditor_' + (Math.random() * 10000).toFixed(0);
    }
  }

  private _initConfig() {
    if (this._optionsService.config && isObject(this._optionsService.config)) {
      Object.assign(this.config, this._optionsService.config);
    }
  }

  private _factory() {
    this._setupService.loaded.subscribe(() => {
      this._zone.runOutsideAngular(() => {
        if (!this.inline) {
          this._setupService.CKEDITOR.disableAutoInline = false;
          this._editor = this._setupService.CKEDITOR.replace(this.editorRef.nativeElement, this.config);
        } else {
          this._setupService.CKEDITOR.disableAutoInline = true;
          this._editor = this._setupService.CKEDITOR.inline(this.editorRef.nativeElement, this.config);
        }
        this._editor.setData(this._value);
        this._bindEvents();
      });
    });
  }

  private _bindEvents() {
    this._editor.on('change', () => {
      this._zone.run(() => {
        this._value = this._editor.getData();
        this._onchange(this._value);
        this._ontouched();
      });
    });
    this._editor.on('instanceReady', (event) => {
      this._zone.run(() => {
        this.ready.emit(event);
      });
    });
    this._editor.on('focus', (event) => {
      this._zone.run(() => {
        this.focus.emit(event);
      });
    });
    this._editor.on('blur', (event) => {
      this._zone.run(() => {
        this.blur.emit(event);
        this._ontouched();
      });
    });
    this._editor.on('destroy', (event) => {
      this._zone.run(() => {
        this.destroy.emit(event);
      });
    });
    this._editor.on('fileUploadRequest', (event) => {
      this._zone.run(() => {
        this.fileUploadRequest.emit(event);
      });
    });
    this._editor.on('fileUploadResponse', (event) => {
      this._zone.run(() => {
        this.fileUploadResponse.emit(event);
      });
    });
  }

  private _destroy() {
    if (this._editor) {
      this._editor.destroy();
      this._editor = null;
    }
  }
}
