import { TestBed } from '@angular/core/testing';

import { PropertyStoreService } from './property-store.service';

describe('PropertyStoreService', () => {
  let service: PropertyStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
