import {AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {NgxCkeditorService} from './ngx-ckeditor.service';
import {fromEvent} from 'rxjs';

@Component({
  selector: 'ngx-ckeditor',
  template: `<textarea #editor></textarea>`,
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
  @Input() config: any;

  @Output() ready: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() focus: EventEmitter<any> = new EventEmitter();
  @Output() blur: EventEmitter<any> = new EventEmitter();

  @ViewChild('editor') editorRef: ElementRef;

  private editor: any;
  private value: string;
  private onChange: (value: string) => void;
  private onTouched: () => void;
  private disabled = false;

  constructor(private ngxCkeditorService: NgxCkeditorService) {
  }

  ngOnInit() {
    this.ngxCkeditorService.load();
  }

  ngAfterViewInit() {
    this.ngxCkeditorService.loaded.subscribe(() => {
      this.editor = this.ngxCkeditorService.CKEDITOR.replace(this.editorRef.nativeElement, {});
      this.editor.setData(this.value);
      this.editor.on('change', () => {
        this.value = this.editor.getData();
        this.onChange(this.value);
        this.onTouched();
        this.change.emit(this.value);
      });
      this.editor.on('instanceReady', (event) => {
        this.ready.emit(event);
      });
      this.editor.on('blur', (event) => {
        this.blur.emit(event);
        this.onTouched();
      });
      this.editor.on('focus', (event) => {
        this.focus.emit(event);
      });
    });
  }

  ngOnDestroy() {
    this.editor.removeAllListeners();
  }

  writeValue(value: string) {
    this.value = value || '';
    if (this.editor) {
      this.editor.setData(this.value);
      const val = this.editor.getData();
      this.editor.setData(val);
    }
  }

  registerOnChange(fn: (_: any) => {}) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => {}) {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
