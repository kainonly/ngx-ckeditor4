import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgxCkeditorComponent} from 'ngx-ckeditor4';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('ckeditor') ckeditor: NgxCkeditorComponent;

  text: string;
  inline = false;

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  change(event) {
    this.ckeditor.setInline(event);
  }


}
