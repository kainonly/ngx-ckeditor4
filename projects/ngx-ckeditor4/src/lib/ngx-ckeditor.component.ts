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

import {NgxCkeditorService} from './ngx-ckeditor.service';
import {NgxCkeditorOptions} from './ngx-ckeditor.options';

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

  @ViewChild('editor') editorRef: ElementRef;

  private _editor: any;
  private _value: string;
  private _onchange: (value: string) => void;
  private _ontouched: () => void;

  constructor(private _ngxCkeditorService: NgxCkeditorService,
              private _options: NgxCkeditorOptions,
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
  }

  ngOnDestroy() {
    this._destroy();
  }

  reused() {
    setTimeout(() => {
      this._destroy();
      this._setRandomId();
      this._initConfig();
      this._factory();
    });
  }

  private _setRandomId() {
    if (!this.id) {
      this.id = 'ckeditor_' + (Math.random() * 10000).toFixed(0);
    }
  }

  private _initConfig() {
    if (this._options.config && isObject(this._options.config)) {
      Object.assign(this.config, this._options.config);
    }
  }

  private _factory() {
    this._ngxCkeditorService.loaded.subscribe(() => {
      if (!this.inline) {
        this._ngxCkeditorService.CKEDITOR.disableAutoInline = false;
        this._editor = this._ngxCkeditorService.CKEDITOR.replace(this.editorRef.nativeElement, this.config);
      } else {
        this._ngxCkeditorService.CKEDITOR.disableAutoInline = true;
        this._editor = this._ngxCkeditorService.CKEDITOR.inline(this.editorRef.nativeElement, this.config);
      }
      this._editor.setData(this._value);
      this._editor.on('change', () => {
        this._value = this._editor.getData();
        this._zone.run(() => {
          this._onchange(this._value);
          this._ontouched();
        });
      });
      this._editor.on('instanceReady', (event) => {
        this.ready.emit(event);
      });
      this._editor.on('blur', (event) => {
        this.blur.emit(event);
        this._zone.run(() => {
          this._ontouched();
        });
      });
      this._editor.on('focus', (event) => {
        this.focus.emit(event);
      });
    });
  }

  private _destroy() {
    if (this._editor) {
      this._editor.destroy();
    }
  }
}
