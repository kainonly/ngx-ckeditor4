import {Injectable} from '@angular/core';
import {DynamicConfigInterface} from '../types/interface/dynamic-config.interface';
import {Subject} from 'rxjs';

@Injectable()
export class CkeditorService {
  /**
   * dynamic config
   */
  _config: Subject<DynamicConfigInterface> = new Subject();


  /**
   *  update config
   */
  updateConfig(config: any, id: string | number = null) {
    this._config.next({
      config: config,
      id: id
    });
  }
}
