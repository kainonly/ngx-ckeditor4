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

  activePath = '/';
  routerlinks = [
    {path: '/', label: 'Hello Ckeditor'},
    {path: '/config', label: 'Dynamic Config'},
    {path: '/form', label: 'In Form'},
  ];

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.routerEvent = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activePath = event.url;
      }
    });
  }

  ngOnDestroy() {
    this.routerEvent.unsubscribe();
  }

}
