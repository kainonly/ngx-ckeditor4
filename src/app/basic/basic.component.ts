import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgxCkeditorComponent} from '../../../projects/ngx-ckeditor4/src/lib/ngx-ckeditor.component';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit, AfterViewInit {
  @ViewChild('ckeditor') ckeditor: NgxCkeditorComponent;

  text = '<p>sss</p>';
  config: any = {};
  language = 'en';

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.ckeditor);
  }

  change(event) {
    console.log(event);
  }

  test() {
    this.config['language'] = 'en';
    this.ckeditor.reused();
  }
}
