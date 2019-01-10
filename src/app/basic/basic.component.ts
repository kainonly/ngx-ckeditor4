import {Component} from '@angular/core';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent {
  select = 0;
  text = '';
  config = {
  };
  editorOptions = {
    theme: 'vs-light',
    language: 'html',
    readOnly: true
  };

  html_context = `<ngx-ckeditor [(ngModel)]="text"></ngx-ckeditor>`;

}
