### Configuration

Ex.Toolbar,[ckeditor docs](https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html#cfg-toolbar)

```typescript
config.toolbar = [
    { name: 'document', items: [ 'Source', '-', 'NewPage', 'Preview', '-', 'Templates' ] },
    { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
    { name: 'basicstyles', items: [ 'Bold', 'Italic' ] }
];
```

You can visit [ckeditor.com/cke4/builder](https://ckeditor.com/cke4/builder) to customize the download package and copy the required settings from config.js