import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class CkeditorService {
  reuse: Subject<number> = new Subject();
}
