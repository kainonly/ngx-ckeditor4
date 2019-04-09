import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  text: string;
  inline = false;

  ngOnInit() {
  }

  change(event) {
    // console.log(event);
  }


}
