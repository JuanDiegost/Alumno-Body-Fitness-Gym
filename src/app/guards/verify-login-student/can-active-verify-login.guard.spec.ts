import { TestBed, async, inject } from '@angular/core/testing';

import { CanActiveVerifyLoginGuardStudent } from './can-active-verify-login-guard-student.service';

describe('CanActiveVerifyLoginGuardStudent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanActiveVerifyLoginGuardStudent]
    });
  });

  it('should ...', inject([CanActiveVerifyLoginGuardStudent], (guard: CanActiveVerifyLoginGuardStudent) => {
    expect(guard).toBeTruthy();
  }));
});
