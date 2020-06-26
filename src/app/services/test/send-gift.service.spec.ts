import { TestBed } from '@angular/core/testing';

import { SendGiftService } from '../send-gift.service';

describe('SendGiftService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendGiftService = TestBed.get(SendGiftService);
    expect(service).toBeTruthy();
  });
});
