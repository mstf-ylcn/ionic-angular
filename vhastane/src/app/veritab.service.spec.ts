import { TestBed } from '@angular/core/testing';

import { VeritabService } from './veritab.service';

describe('VeritabService', () => {
  let service: VeritabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VeritabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
