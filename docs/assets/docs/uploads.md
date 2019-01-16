### How to Upload

First you need to define `config.filebrowserUploadUrl`.

```typescript
config = {
    filebrowserUploadUrl: 'http://127.0.0.1:8000/index/index/uploads?field=upload'
};
```

After that you can listen to requests and responses for events to customize.

```typescript
fileUploadRequest(event: EventInfo) {
    console.log(event);
}

fileUploadResponse(event: EventInfo) {
    event.stop();
    const data = event.data,
        xhr = data.fileLoader.xhr,
        response = JSON.parse(xhr.responseText);
    if (response['error']) {
        data.message = 'upload fail';
        event.cancel();
    } else {
        // save_name is the file address returned by the upload
        data.url = 'http://127.0.0.1:8000/uploads/' + response['data']['save_name'];
    }
}
```

Define the ckeditor component.

```html
<ngx-ckeditor [(ngModel)]="text"
            (fileUploadRequest)="fileUploadRequest($event)"
            (fileUploadResponse)="fileUploadResponse($event)"
            [config]="config"></ngx-ckeditor>
```