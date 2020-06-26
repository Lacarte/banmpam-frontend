import { TestBed } from '@angular/core/testing';

import { PingServerService } from '../ping-server.service';

describe('PingServerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PingServerService = TestBed.get(PingServerService);
    expect(service).toBeTruthy();
  });
});
