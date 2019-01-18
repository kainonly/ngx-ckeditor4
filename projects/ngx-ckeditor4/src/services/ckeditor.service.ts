import {Injectable} from '@angular/core';
import {DynamicConfigInterface} from '../types/interface/dynamic-config.interface';
import {DynamicInlineInterface} from '../types/interface/dynamic-inline.interface';
import {Subject} from 'rxjs';

@Injectable()
export class CkeditorService {
  /**
   * dynamic config
   */
  _config: Subject<DynamicConfigInterface> = new Subject();

  /**
   * dynamic inline
   */
  _inline: Subject<DynamicInlineInterface> = new Subject();

  /**
   *  update config
   */
  updateConfig(config: any, id: string | number = null) {
    this._config.next({
      config: config,
      id: id
    });
  }

  /**
   *  set inline
   */
  setInline(inline_mode: boolean, id: string | number = null) {
    this._inline.next({
      status: inline_mode,
      id: id
    });
  }
}
