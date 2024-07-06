import { TestBed } from '@angular/core/testing';

import { ListTestService } from './list-test.service';

describe('ListTestService', () => {
  let service: ListTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
