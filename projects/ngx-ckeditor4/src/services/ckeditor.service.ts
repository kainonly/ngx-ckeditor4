import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable()
export class CkeditorService {
  private config: Subject<any> = new Subject();

  setConfig(config: any) {
    this.config.next(config);
  }

  onConfig(): Observable<any> {
    return this.config;
  }
}
