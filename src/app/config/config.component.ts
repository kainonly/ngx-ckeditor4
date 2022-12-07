import { Component } from "@angular/core";

@Component({
  selector: "app-config",
  templateUrl: "./config.component.html",
  styleUrls: ["./config.component.scss"]
})
export class ConfigComponent {
  text: string;
  locale = "en_us";
  config = {};
  basic = [
    { name: "document", items: ["Source", "-", "NewPage", "Preview", "-", "Templates"] },
    { name: "clipboard", items: ["Cut", "Copy", "Paste", "PasteText", "PasteFromWord", "-", "Undo", "Redo"] },
    { name: "basicstyles", items: ["Bold", "Italic"] }
  ];

}
