import { TestBed, inject } from '@angular/core/testing';

import { MarkMessagesAsReadEffectService } from './mark-messages-as-read-effect.service';

describe('MarkMessagesAsReadEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarkMessagesAsReadEffectService]
    });
  });

  it('should be created', inject([MarkMessagesAsReadEffectService], (service: MarkMessagesAsReadEffectService) => {
    expect(service).toBeTruthy();
  }));
});
