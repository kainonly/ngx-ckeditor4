import {CkeditorConfigInterface} from '../types/interface/ckeditor-config.interface';

export class OptionsService {
  /**
   * Set the load address of ckeditor, you can use local library or remote CDN, etc.
   */
  url: string;

  /**
   * Set the master configuration of ckeditor
   */
  config?: CkeditorConfigInterface;
}
