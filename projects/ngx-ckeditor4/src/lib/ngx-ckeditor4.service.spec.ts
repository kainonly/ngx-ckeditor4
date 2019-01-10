import { TestBed } from '@angular/core/testing';

import { NgxCkeditor4Service } from './ngx-ckeditor4.service';

describe('NgxCkeditor4Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxCkeditor4Service = TestBed.get(NgxCkeditor4Service);
    expect(service).toBeTruthy();
  });
});
