import { InjectionToken } from "@angular/core";

export const OPTION = new InjectionToken<Option>("ckeditor.option");

export interface Option {
  /**
   * Set the load address of ckeditor, you can use local library or remote CDN, etc.
   */
  url: string;

  /**
   * Set the master configuration of ckeditor
   */
  config?: {
    skin?: string;
    height?: number;
    filebrowserUploadMethod?: string;
    filebrowserUploadUrl?: string;
    [key: string]: any;
  };
}

export interface EventInfo {
  /**
   * Any kind of additional data. Its format and usage is event dependent.
   */
  data: any;

  /**
   * The editor instance that holds the sender. May be the same as sender. May be null if the sender is not part of an editor inst
   */
  editor: any;

  /**
   * Any extra data appended during the listener registration.
   */
  listenerData: any;

  /**
   * The event name.
   */
  name: string;

  /**
   * The object that publishes (sends) the event.
   */
  sender: any;

  /**
   * Indicates that the event is to be cancelled (if cancelable).
   */
  cancel(): void;

  /**
   * Removes the current listener.
   */
  removeListener(): void;

  /**
   * Indicates that no further listeners are to be called.
   */
  stop(): void;
}
