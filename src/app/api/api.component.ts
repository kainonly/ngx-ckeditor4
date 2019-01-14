import {Component} from '@angular/core';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent {
  dataSet = [{
    param: '[ngModel]',
    desc: 'Edit content of ckeditor value',
    type: 'string',
    default: '-'
  }, {
    param: '[id]',
    desc: 'The unique identifier id of ckeditor',
    type: 'string',
    default: 'null'
  }, {
    param: '[config]',
    desc: 'Ckeditor configuration properties',
    type: 'object',
    default: '{}'
  }, {
    param: '[inline]',
    desc: 'Ckeditor set Inline mode',
    type: 'boolean',
    default: 'false'
  }, {
    param: '(ready)',
    desc: 'The callback function when edit component ready',
    type: 'EventEmitter<string>',
    default: '-'
  }, {
    param: '(focus)',
    desc: 'The callback function when edit component focus',
    type: 'EventEmitter<string>',
    default: '-'
  }, {
    param: '(blur)',
    desc: 'The callback function when edit component blur',
    type: 'EventEmitter<string>',
    default: '-'
  }, {
    param: '(destroy)',
    desc: 'The callback function when edit component destroy',
    type: 'EventEmitter<string>',
    default: '-'
  }, {
    param: '(ngModelChange)',
    desc: 'The callback function when edit value change',
    type: 'EventEmitter<string>',
    default: '-'
  }, {
    param: 'reused(delay:number)',
    desc: 'Dynamically change ckeditor configuration using reused',
    type: 'Observable<boolean>',
    default: 'delay=0'
  }];
}
