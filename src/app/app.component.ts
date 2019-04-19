import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {CkeditorService} from 'ngx-ckeditor4';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private routerEvent: Subscription;

  activePath = '/';
  routerlinks = [
    {path: '/', label: 'Hello Ckeditor'},
    {path: '/config', label: 'Dynamic Config'},
    {path: '/form', label: 'In Form'},
    {path: '/upload', label: 'Upload'},
  ];

  constructor(private router: Router,
              private ckeditorService: CkeditorService) {
  }

  ngOnInit() {
    this.ckeditorService.fileUploadRequest = (event) => {
      try {
        const fileLoader = event.data.fileLoader;
        const formData = new FormData();
        const xhr = fileLoader.xhr;
        xhr.withCredentials = true;
        xhr.open('POST', fileLoader.uploadUrl, true);
        formData.append('image', fileLoader.file, fileLoader.fileName);
        fileLoader.xhr.send(formData);
        event.stop();
      } catch (e) {
        console.warn(e);
      }
    };
    this.ckeditorService.fileUploadResponse = (event) => {
      try {
        event.stop();
        const data = event.data;
        const xhr = data.fileLoader.xhr;
        const response = JSON.parse(xhr.responseText);
        if (response.error) {
          data.message = 'upload fail';
          event.cancel();
        } else {
          data.url = 'http://127.0.0.1:8000/uploads/' + response.data.save_name;
        }
      } catch (e) {
        console.warn(e);
      }
    };
    this.routerEvent = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activePath = event.url;
      }
    });
  }

  ngOnDestroy() {
    this.routerEvent.unsubscribe();
  }

}
