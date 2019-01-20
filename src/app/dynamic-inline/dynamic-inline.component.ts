import {Component} from '@angular/core';
import {CkeditorService} from 'ngx-ckeditor4';

@Component({
  selector: 'app-dynamic-inline',
  templateUrl: './dynamic-inline.component.html',
  styleUrls: ['./dynamic-inline.component.scss']
})
export class DynamicInlineComponent {
  text = `<h1>Inline Editing</h1>
    <p>Inline Editing is a new technology introduced in CKEditor 4 that allows you to&nbsp;<strong>select any editable element on the page and edit it in-place</strong>. As a result, the editor can be used to edit content that looks just like the final page.</p>
    <p>It is a total WYSIWYG experience, because not only the edited content looks like the final outcome, but also the page and the context where the content is placed is the real one. Unlike in&nbsp;<a href="https://ckeditor.com/docs/ckeditor4/latest/guide/dev_framed.html">classic editor</a>, there is no&nbsp;<code>&lt;iframe&gt;</code>&nbsp;element created for the editing area. The CSS styles used for editor content are exactly the same as on the target page where this content is rendered!</p>
  `;

  inline = false;
  config = {
    height: 400
  };

  constructor(public ckeditorService: CkeditorService) {
  }
}
