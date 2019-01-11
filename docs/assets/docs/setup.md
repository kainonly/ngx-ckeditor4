### NPM Package

To add ngx-ckeditor4 library to your package.json use the following command.

```shell
$ npm install ngx-ckeditor4 --save
```

As the library is using [ckeditor](https://ckeditor.com/docs/ckeditor4/latest/index.html) you will need to add node_modules/ckeditor/** to your application assets.

### angular.json

```json
{
 "architect": {
    "build": {
      "assets": [
+         {
+          "glob": "**/*",
+          "input": "./node_modules/ckeditor/",
+          "output": "/assets/ckeditor/"
+         }
      ]
    }
  }
}
```

If you are using Angular CLI you can follow the [angular.json](https://cli.angular.io/) example below...

### Configuration

You must import NgxCkeditorModule inside your main application module (usually named AppModule) with forRoot to be able to use ckeditor component.

```typescript
import { NgModule } from '@angular/core';
+ import { NgxCkeditorModule } from 'ngx-ckeditor4';
 
import { AppComponent } from './app.component'
 
@NgModule({
  imports: [
+   NgxCkeditorModule.forRoot({
+     url: './assets/ckeditor/ckeditor.js'
+   }),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

You can also use CDN from [cdn.ckeditor.com](http://cdn.ckeditor.com/),The URL structure for CKEditor 4 is as follows:

> `https://cdn.ckeditor.com/[version.number]/[distribution]/ckeditor.js`

### Component

In you component

```html
<!-- Basic Use -->
<ngx-ckeditor [(ngModel)]="text"></ngx-ckeditor>

<!-- With Config -->
<ngx-ckeditor [(ngModel)]="text" [config]="config"></ngx-ckeditor>

<!-- On Change -->
<ngx-ckeditor [(ngModel)]="text" 
              (ngModelChange)="change($event)"></ngx-ckeditor>

<!-- Other Event -->
<ngx-ckeditor [(ngModel)]="text" 
              (ready)="ready($event)"
              (focus)="focus($event)"
              (blur)="blur($event)"></ngx-ckeditor>
```
