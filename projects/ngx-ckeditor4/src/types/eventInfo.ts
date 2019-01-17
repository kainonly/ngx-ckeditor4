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
