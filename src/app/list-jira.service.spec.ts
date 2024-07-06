import { TestBed } from '@angular/core/testing';

import { ListJiraService } from './list-jira.service';

describe('ListJiraService', () => {
  let service: ListJiraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListJiraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
