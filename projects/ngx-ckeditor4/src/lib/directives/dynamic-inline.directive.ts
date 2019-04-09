import {AfterContentInit, AfterViewInit, Directive, Input, OnDestroy, OnInit} from '@angular/core';
import {NgxCkeditorComponent} from '../component/ngx-ckeditor.component';
import {CkeditorService} from '../services/ckeditor.service';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[ckDynamicInline]'
})
export class DynamicInlineDirective implements OnInit {
  constructor(private ngxCkeditorComponent: NgxCkeditorComponent) {
  }

  ngOnInit() {

  }
}

