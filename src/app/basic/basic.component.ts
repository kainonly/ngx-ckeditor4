import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {
  text = '<p>sss</p>';

  constructor() {
  }

  ngOnInit() {
  }

  change(event) {
  }

  ready(event) {
  }
}
