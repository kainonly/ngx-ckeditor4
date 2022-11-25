import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { auditTime, switchMap, take } from "rxjs/operators";
import { NgxCkeditorService } from "./ckeditor.service";
import { isPlatformBrowser } from "@angular/common";
import { EventInfo } from "./types";

const windowAny: any = window;

@Component({
  selector: "ngx-ckeditor",
  exportAs: "ngxCkeditor",
  template: `<textarea style="display: none" #ref [id]="id"></textarea>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgxCkeditorComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxCkeditorComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild("ref") ref: ElementRef;

  @Input() id: string;
  @Input() locale: string;
  @Input() config: any = {};
  @Input() inline: boolean;
  @Input() fileUploadRequestCustom = false;
  @Input() fileUploadResponseCustom = false;

  @Output() ready: EventEmitter<EventInfo> = new EventEmitter();
  @Output() focus: EventEmitter<EventInfo> = new EventEmitter();
  @Output() blur: EventEmitter<EventInfo> = new EventEmitter();
  @Output() fileUploadRequest: EventEmitter<EventInfo> = new EventEmitter();
  @Output() fileUploadResponse: EventEmitter<EventInfo> = new EventEmitter();

  private instance: any;

  private onChange: (HTMLRows: string) => void;
  private onTouched: () => void;
  private $data: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private $disabled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    @Inject(PLATFORM_ID)
    private platformId: string,
    private ckeditor: NgxCkeditorService,
    private zone: NgZone
  ) {}

  /**
   * Writes a new value to the element.
   */
  writeValue(data: string) {
    this.$data.next(data);
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
    this.$disabled.next(isDisabled);
  }

  ngOnInit() {
    this.setConfiguration();
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    if (windowAny.hasOwnProperty("CKEDITOR")) {
      this.initialize();
      return;
    }
    this.ckeditor.loadScript().subscribe(() => {
      this.initialize();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.inline && !changes.inline.firstChange) {
      this.inline = changes.inline.currentValue;
      this.reload();
    }
    if (!!changes.locale && !changes.locale.firstChange) {
      this.setLanguage(changes.locale.currentValue);
      this.reload();
    }
    if (!!changes.config && !changes.config.firstChange) {
      delete this.config.language;
      this.config = changes.config.currentValue;
      this.reload();
    }
  }

  ngOnDestroy(): void {
    this.destroy();
  }

  /**
   * 重新载入
   */
  private reload() {
    this.destroy();
    this.setConfiguration();
    this.initialize();
  }

  /**
   * 初始化
   */
  private initialize(): void {
    this.zone.runOutsideAngular(() => {
      const CKEDITOR = windowAny["CKEDITOR"];
      if (!this.inline) {
        CKEDITOR.disableAutoInline = false;
        this.instance = CKEDITOR.replace(this.ref.nativeElement, this.config);
      } else {
        CKEDITOR.disableAutoInline = true;
        this.instance = CKEDITOR.inline(this.ref.nativeElement, this.config);
      }

      this.instance.on("instanceReady", event => {
        this.$data.pipe(take(1)).subscribe(data => {
          this.instance.setData(data);
        });
        this.$disabled.subscribe(disabled => {
          this.instance.setReadOnly(disabled);
        });
        this.zone.run(() => this.ready.emit(event));
      });
      this.instance.on("change", event => {
        this.zone.run(() => this.$data.next(event.editor.getData()));
      });
      this.instance.on("focus", event => {
        this.zone.run(() => this.focus.emit(event));
      });
      this.instance.on("blur", event => {
        this.zone.run(() => {
          this.blur.emit(event);
          if (this.onTouched) {
            this.onTouched();
          }
        });
      });
      this.instance.on("fileUploadRequest", event => {
        this.zone.run(() => {
          if (this.fileUploadRequestCustom) {
            this.fileUploadRequest.emit(event);
          } else if (this.ckeditor.fileUploadRequest) {
            this.ckeditor.fileUploadRequest(event);
          }
        });
      });
      this.instance.on("fileUploadResponse", event => {
        this.zone.run(() => {
          if (this.fileUploadResponseCustom) {
            this.fileUploadResponse.emit(event);
          } else if (this.ckeditor.fileUploadResponse) {
            this.ckeditor.fileUploadResponse(event);
          }
        });
      });
    });

    this.ready
      .pipe(
        switchMap(() => this.$data),
        auditTime(200)
      )
      .subscribe(data => {
        this.onChange(data);
      });
  }

  /**
   * 设置配置
   */
  private setConfiguration() {
    if (!this.id) {
      this.id = `ck_${(Math.random() * 10000).toFixed(0)}`;
    }

    if (this.ckeditor.option.config) {
      this.config = {
        ...this.config,
        ...this.ckeditor.option.config
      };
    }

    if (this.locale) {
      this.setLanguage(this.locale);
    }
  }

  /**
   * 销毁 ckeditor
   */
  private destroy() {
    if (this.instance) {
      this.instance.destroy();
      this.instance = undefined;
    }
  }

  /**
   * 设置语言包
   */
  private setLanguage(locale: string) {
    switch (locale) {
      case "en_us":
        this.config.language = "en";
        break;
      case "zh_cn":
        this.config.language = "zh-CN";
        break;
    }
  }
}
