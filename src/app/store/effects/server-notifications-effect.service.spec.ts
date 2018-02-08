import { TestBed, inject } from '@angular/core/testing';

import { ServerNotificationsEffectService } from './server-notifications-effect.service';

describe('ServerNotificationsEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerNotificationsEffectService]
    });
  });

  it('should be created', inject([ServerNotificationsEffectService], (service: ServerNotificationsEffectService) => {
    expect(service).toBeTruthy();
  }));
});
