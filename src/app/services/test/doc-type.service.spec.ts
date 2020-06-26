import { TestBed } from '@angular/core/testing';

import { DocTypeService } from '../doc-type.service';

describe('DocTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DocTypeService = TestBed.get(DocTypeService);
    expect(service).toBeTruthy();
  });
});
