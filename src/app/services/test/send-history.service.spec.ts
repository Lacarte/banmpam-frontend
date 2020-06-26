import { TestBed } from '@angular/core/testing';

import { SendHistoryService } from '../send-history.service';

describe('SendHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendHistoryService = TestBed.get(SendHistoryService);
    expect(service).toBeTruthy();
  });
});
