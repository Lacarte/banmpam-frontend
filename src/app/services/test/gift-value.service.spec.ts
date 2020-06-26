import { TestBed } from '@angular/core/testing';

import { GiftValueService } from '../gift-value.service';

describe('GiftValueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GiftValueService = TestBed.get(GiftValueService);
    expect(service).toBeTruthy();
  });
});
