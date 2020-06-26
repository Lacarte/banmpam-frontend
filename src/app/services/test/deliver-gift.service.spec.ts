import { TestBed } from '@angular/core/testing';

import { DeliverGiftService } from '../deliver-gift.service';

describe('DeliverGiftService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeliverGiftService = TestBed.get(DeliverGiftService);
    expect(service).toBeTruthy();
  });
});
