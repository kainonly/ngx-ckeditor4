### Reused

Dynamically change ckeditor configuration using reused.

```html
 <ngx-ckeditor #editor [(ngModel)]="text" [config]="config"></ngx-ckeditor>
```

Execute reused after modifying config

```typescript
@Component({
  selector: 'app-reused',
  templateUrl: './reused.component.html',
  styleUrls: ['./reused.component.scss']
})
export class ReusedComponent {
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

  @ViewChild('editor') editor: NgxCkeditorComponent;

  changeLanguage() {
    this.editor.reused();
  }

  changeToolBar() {
    this.editor.reused();
  }
}
```
