import {Component} from '@angular/core';
import {EventInfo} from 'dev-ngx-ckeditor4';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.scss']
})
export class UploadsComponent {
  text = '';
  config = {
    filebrowserUploadUrl: 'http://127.0.0.1:8000/index/index/uploads?field=upload'
  };

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
      data.url = 'http://127.0.0.1:8000/uploads/' + response['data']['save_name'];
    }
  }
}
