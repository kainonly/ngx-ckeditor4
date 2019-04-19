import {Injectable} from '@angular/core';
import {EventInfo} from './eventInfo';

@Injectable()
export class CkeditorService {

  fileUploadRequest?(event: EventInfo): void;

  fileUploadResponse?(event: EventInfo): void;
}
