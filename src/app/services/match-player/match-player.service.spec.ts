import { TestBed } from '@angular/core/testing';

import { MatchPlayerService } from './match-player.service';

describe('MatchPlayerService', () => {
  let service: MatchPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
