import { Component } from "@angular/core";
import { EventInfo } from "ngx-ckeditor4";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent {
  text: string = '<p>Hello</p>';
  inline = false;
  disabled = false;

  ready(event: EventInfo): void {
    console.log(event);
  }

  change(event: string): void {
    console.log(event);
  }
}
