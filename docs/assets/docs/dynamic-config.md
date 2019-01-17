### Dynamic Config

This can better meet the dynamic configuration of ckeditor.

```html
<ngx-ckeditor [(ngModel)]="text" [(config)]="config" dynamic-config></ngx-ckeditor>
```

Instantiation service

```typescript
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
```

update config

```html
<nz-radio-group [(ngModel)]="config.language"
                (ngModelChange)="ckeditorService.updateConfig(config)">
  <label nz-radio-button nzValue="en">en</label>
  <label nz-radio-button nzValue="zh-CN">zh-CN</label>
</nz-radio-group>

<nz-radio-group [(ngModel)]="config.toolbar"
                (ngModelChange)="ckeditorService.updateConfig(config)">
  <label nz-radio-button [nzValue]="default">default</label>
  <label nz-radio-button [nzValue]="basic">basic</label>
</nz-radio-group>
```
