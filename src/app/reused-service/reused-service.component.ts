import {Component} from '@angular/core';
import {} from 'dev-ngx-ckeditor4';

@Component({
  selector: 'app-reused-service',
  templateUrl: './reused-service.component.html',
  styleUrls: ['./reused-service.component.scss']
})
export class ReusedServiceComponent {
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


  changeLanguage() {
  }

  changeToolBar() {
  }
}
