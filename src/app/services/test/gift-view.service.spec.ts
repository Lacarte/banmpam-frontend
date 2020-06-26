import { TestBed } from '@angular/core/testing';

import { GiftViewService } from '../gift-view.service';

describe('GiftViewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GiftViewService = TestBed.get(GiftViewService);
    expect(service).toBeTruthy();
  });
});
