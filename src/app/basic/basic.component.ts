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
    toolbarGroups: [
      {name: 'document', groups: ['mode', 'document', 'doctools']},
      {name: 'clipboard', groups: ['clipboard', 'undo']},
      {name: 'editing', groups: ['find', 'selection']},
      {name: 'forms'},
      {name: 'basicstyles', groups: ['basicstyles', 'cleanup']},
      {name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi']},
      {name: 'links'},
      {name: 'insert'},
      {name: 'styles'},
      {name: 'colors'},
      {name: 'tools'},
      {name: 'others'},
    ]
  };
  editorOptions = {
    theme: 'vs-light',
    language: 'html',
    readOnly: true
  };

  html_context = `<ngx-ckeditor [(ngModel)]="text"></ngx-ckeditor>`;

}
