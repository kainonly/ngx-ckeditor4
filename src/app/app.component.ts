import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  text = '<p>asdqweqwe</p>';

  change(event) {
    console.log(event);
  }

}
