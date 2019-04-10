import {Injectable} from '@angular/core';
import {EventInfo} from './eventInfo';

@Injectable()
export class OptionsService {
  /**
   * Set the load address of ckeditor, you can use local library or remote CDN, etc.
   */
  url: string;

  /**
   * Set the master configuration of ckeditor
   */
  config?: {
    skin?: string,
    height?: number,
    filebrowserUploadMethod?: string,
    filebrowserUploadUrl?: string,
    [key: string]: any
  };

  fileUploadRequest?(event: EventInfo): void;

  fileUploadResponse?(event: EventInfo): void;
}
