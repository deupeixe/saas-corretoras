import { TestBed } from '@angular/core/testing';

import { LeadStoreService } from './lead-store.service';

describe('LeadStoreService', () => {
  let service: LeadStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeadStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
