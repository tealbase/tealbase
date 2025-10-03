import { TestBed } from '@angular/core/testing';

import { TealbaseService } from './tealbase.service';

describe('TealbaseService', () => {
  let service: TealbaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TealbaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
