import { TestBed, inject } from '@angular/core/testing';

import { ServicePageRootService } from './service-page-home.service';

describe('ServicePageRootService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicePageRootService]
    });
  });

  it('should be created', inject([ServicePageRootService], (service: ServicePageRootService) => {
    expect(service).toBeTruthy();
  }));
});
