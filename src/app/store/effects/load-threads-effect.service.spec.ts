import { TestBed, inject } from '@angular/core/testing';

import { LoadThreadsEffectService } from './load-threads-effect.service';

describe('LoadThreadsEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadThreadsEffectService]
    });
  });

  it('should be created', inject([LoadThreadsEffectService], (service: LoadThreadsEffectService) => {
    expect(service).toBeTruthy();
  }));
});
