import { Inject, Injectable } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { EventInfo, OPTION, Option } from "./types";
import { fromEvent, Observable } from "rxjs";
import { delay } from "rxjs/operators";

@Injectable()
export class CkeditorService {
  constructor(@Inject(OPTION) public readonly option: Option, @Inject(DOCUMENT) private document: any) {}

  fileUploadRequest?(event: EventInfo): void;

  fileUploadResponse?(event: EventInfo): void;

  loadScript(): Observable<void | Event> {
    const script: HTMLScriptElement = this.document.createElement("script");
    script.src = this.option.url;
    script.async = true;
    this.document.head.appendChild(script);
    return fromEvent(script, "load").pipe(delay(200));
  }
}
