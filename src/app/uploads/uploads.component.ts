import {Component} from '@angular/core';
import {EventInfo} from 'ngx-ckeditor4';

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

  /**
   * Custom Upload Request
   */
  fileUploadRequest(event: EventInfo) {
    const fileLoader = event.data.fileLoader;
    const formData = new FormData();
    const xhr = fileLoader.xhr;

    xhr.withCredentials = true;
    xhr.open('POST', fileLoader.uploadUrl, true);
    formData.append('image', fileLoader.file, fileLoader.fileName);
    fileLoader.xhr.send(formData);
    event.stop();
  }

  /**
   * Custom Upload Response
   */
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
