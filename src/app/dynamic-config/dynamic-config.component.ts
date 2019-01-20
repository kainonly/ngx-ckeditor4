import {Component} from '@angular/core';
import {CkeditorService} from 'ngx-ckeditor4';

@Component({
  selector: 'app-dynamic-config',
  templateUrl: './dynamic-config.component.html',
  styleUrls: ['./dynamic-config.component.scss']
})
export class DynamicConfigComponent {
  text = '';
  default = [
    {name: 'document', items: ['Source', '-', 'NewPage', 'Preview', '-', 'Templates']},
  ];
  basic = [
    {name: 'document', items: ['Source', '-', 'NewPage', 'Preview', '-', 'Templates']},
    {name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']},
    {name: 'basicstyles', items: ['Bold', 'Italic']}
  ];

  config = {
    language: 'en',
    toolbar: this.default
  };

  constructor(public ckeditorService: CkeditorService) {
  }
}
