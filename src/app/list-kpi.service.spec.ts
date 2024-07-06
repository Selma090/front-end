import { TestBed } from '@angular/core/testing';

import { ListKpiService } from './list-kpi.service';

describe('ListKpiService', () => {
  let service: ListKpiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListKpiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
