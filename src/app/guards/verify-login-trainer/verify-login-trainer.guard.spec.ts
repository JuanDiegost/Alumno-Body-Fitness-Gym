import { TestBed, async, inject } from '@angular/core/testing';

import { CanActiveVerifyLoginTrainer } from './can-active-verify-login-trainer-guard.service';

describe('CanActiveVerifyLoginTrainer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActiveVerifyLoginTrainer]
    });
  });

  it('should ...', inject([CanActiveVerifyLoginTrainer], (guard: CanActiveVerifyLoginTrainer) => {
    expect(guard).toBeTruthy();
  }));
});
