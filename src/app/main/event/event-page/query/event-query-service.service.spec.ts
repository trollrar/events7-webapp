import { TestBed } from '@angular/core/testing';

import { EventQueryService } from './event-query.service';

describe('EventQueryServiceService', () => {
  let service: EventQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
