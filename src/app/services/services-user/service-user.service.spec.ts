import { TestBed, inject } from '@angular/core/testing';

import { ServiceUserService } from './service-user.service';

describe('ServiceUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceUserService]
    });
  });

  it('should be created', inject([ServiceUserService], (service: ServiceUserService) => {
    expect(service).toBeTruthy();
  }));
});
