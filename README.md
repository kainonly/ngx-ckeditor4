## NGX-CKEDITOR 4

[![NPM version](https://badge.fury.io/js/ngx-ckeditor4.png)](http://badge.fury.io/js/ngx-ckeditor4)
[![Downloads](https://img.shields.io/npm/dm/ngx-ckeditor4.svg?style=flat-square)](https://www.npmjs.com/package/ngx-ckeditor4)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![GitHub license](https://img.shields.io/badge/license-LGPL2.1-blue.svg)](https://raw.githubusercontent.com/kainonly/ngx-ckeditor4.js/master/LICENSE)

#### NPM Package

To add ngx-ckeditor4 library to your package.json use the following command.

```shell
npm install ngx-ckeditor4 --save
```

As the library is using [ckeditor](https://ckeditor.com/docs/ckeditor4/latest/index.html) you will need to add node_modules/ckeditor/** to your application assets.

#### Set angular.json

```json
{
 "architect": {
    "build": {
      "assets": [
          {
            "glob": "**/*",
            "input": "./node_modules/ckeditor/",
            "output": "/assets/ckeditor/"
          }
      ]
    }
  }
}
```

If you are using Angular CLI you can follow the [angular.json](https://cli.angular.io/) example below...

#### Configuration

You must import NgxCkeditorModule inside your main application module (usually named AppModule) with forRoot to be able to use ckeditor component.`fileUploadRequest(event)` & `fileUploadResponse(event)` is general definition.

```typescript
import { NgModule } from '@angular/core';
+ import { NgxCkeditorModule } from 'ngx-ckeditor4';
 
import { AppComponent } from './app.component'
 
@NgModule({
  imports: [
+   NgxCkeditorModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: CkeditorOptions, useValue: {
        url: 'https://cdn.bootcss.com/ckeditor/4.11.3/ckeditor.js',
        config: {
          filebrowserUploadMethod: 'xhr',
          filebrowserUploadUrl: 'http://127.0.0.1:8000/index/index/uploads',
        },
        fileUploadRequest(event) {
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
        },
        fileUploadResponse(event) {
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
        }
      }
    },
  ],
})
export class AppModule { }
```

You can also use CDN from [cdn.ckeditor.com](http://cdn.ckeditor.com/),The URL structure for CKEditor 4 is as follows:

> `https://cdn.ckeditor.com/[version.number]/[distribution]/ckeditor.js`

#### Template

In HTML Template

```html
<!-- Basic Use -->
 <ngx-ckeditor [(ngModel)]="text" [inline]="inline" [disabled]="disabled"></ngx-ckeditor>

<!-- Set Config & Locale -->
<ngx-ckeditor [(ngModel)]="text" [config]="config" [locale]="locale"></ngx-ckeditor>

<!-- In Forms -->
<ngx-ckeditor formControlName="text"></ngx-ckeditor>

<!-- On Event -->
<ngx-ckeditor [(ngModel)]="text" 
              (ready)="ready($event)"
              (focus)="focus($event)"
              (blur)="blur($event)"
              (fileUploadRequest)="fileUploadRequest($event)"
              (fileUploadResponse)="fileUploadResponse($event)"></ngx-ckeditor>
```

#### Component

NgxCkeditorComponent

- `@Input() id: string` editor ID
- `@Input() locale: string` editor language, **en_us => en, zh_cn => zh-CN**, support dynamic
- `@Input() config: any = {}` editor config, support dynamic
- `@Input() inline: boolean` editor inline mode, support dynamic
- `@Input() fileUploadRequestCustom = false` editor turn on customization fileUploadRequest
- `@Input() fileUploadResponseCustom = false` editor turn on customization fileUploadResponse
- `@Output() ready: EventEmitter<EventInfo>` editor on events ready
- `@Output() focus: EventEmitter<EventInfo>` editor on events focus
- `@Output() blur: EventEmitter<EventInfo>` editor on events blur
- `@Output() fileUploadRequest: EventEmitter<EventInfo>` editor on events fileUploadRequest
- `@Output() fileUploadResponse: EventEmitter<EventInfo>` editor on events fileUploadResponse

#### License

License inherits Ckiditor's LGPL agreement,Licensed under the terms of LGPL. For full details about the license, please check the LICENSE file.
