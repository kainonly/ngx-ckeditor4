import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgxCkeditorService} from './ngx-ckeditor.service';

@Component({
  selector: 'ngx-ckeditor',
  templateUrl: './ngx-ckeditor.component.html',
})
export class NgxCkeditorComponent implements OnInit, AfterViewInit {
  @ViewChild('editor') editor: ElementRef;

  constructor(private ngxCkeditorService: NgxCkeditorService) {
  }

  ngOnInit() {
    this.ngxCkeditorService.load();
  }

  ngAfterViewInit() {
    this.ngxCkeditorService.loaded.subscribe(() => {
      console.log(this.ngxCkeditorService.CKEDITOR);
      this.ngxCkeditorService.CKEDITOR.replace(this.editor.nativeElement, {});
    });
  }

}
