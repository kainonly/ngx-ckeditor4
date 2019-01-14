import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private routerEvent: Subscription;

  active_path = '/';
  routerlinks = [
    {path: '/', label: 'Getting Started'},
    {path: '/example', label: 'Example Ckeditor4'},
    {path: '/reused', label: 'Reused Ckeditor'}
  ];

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.routerEvent = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.active_path = event.url;
      }
    });
  }

  ngOnDestroy() {
    this.routerEvent.unsubscribe();
  }
}
