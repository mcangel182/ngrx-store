import { TestBed, inject } from '@angular/core/testing';

import { WriteNewMessageEffectService } from './write-new-message-effect.service';

describe('WriteNewMessageEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WriteNewMessageEffectService]
    });
  });

  it('should be created', inject([WriteNewMessageEffectService], (service: WriteNewMessageEffectService) => {
    expect(service).toBeTruthy();
  }));
});
