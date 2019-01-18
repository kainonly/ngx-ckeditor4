### Dynamic Inline Mode

This can better meet the dynamic inline mode of ckeditor.

```html
<ngx-ckeditor dynamic-inline [(ngModel)]="text" [config]="config"></ngx-ckeditor>
```

Instantiation service

```typescript
@Component({
  selector: 'app-dynamic-inline',
  templateUrl: './dynamic-inline.component.html',
  styleUrls: ['./dynamic-inline.component.scss']
})
export class DynamicInlineComponent {
  text = `...`;

  inline = false;
  config = {
    height: 400
  };

  constructor(public ckeditorService: CkeditorService) {
  }
}
```

set inline mode

```html
<nz-radio-group [(ngModel)]="inline" (ngModelChange)="ckeditorService.setInline($event)">
  <label nz-radio-button [nzValue]="false">Default Mode</label>
  <label nz-radio-button [nzValue]="true">Inline Mode</label>
</nz-radio-group>
```
