import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCkeditor4Component } from './ngx-ckeditor4.component';

describe('NgxCkeditor4Component', () => {
  let component: NgxCkeditor4Component;
  let fixture: ComponentFixture<NgxCkeditor4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxCkeditor4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCkeditor4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
