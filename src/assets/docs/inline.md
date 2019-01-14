### Inline Mode

Set inline mode for ckeditor.

```html
<ngx-ckeditor #editor
              [(ngModel)]="text"
              [inline]="inline"
              [config]="config">
</ngx-ckeditor>
```

Execute reused after modifying inline

```typescript
@Component({
  selector: 'app-inline',
  templateUrl: './inline.component.html',
  styleUrls: ['./inline.component.scss']
})
export class InlineComponent {
  text = `...`;

  inline = false;
  config = {
    height: 400
  };

  @ViewChild('editor') editor: NgxCkeditorComponent;

  changeInline() {
    this.editor.reused();
  }
}

```
