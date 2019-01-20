import {Component} from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent {
  text = '<p>example</p>';

  basic_config = {
    toolbar: [
      {name: 'document', items: ['Source', '-', 'NewPage', 'Preview', '-', 'Templates']},
      {name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']},
      {name: 'basicstyles', items: ['Bold', 'Italic']}
    ]
  };
}
