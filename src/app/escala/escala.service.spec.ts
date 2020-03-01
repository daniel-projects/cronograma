import { TestBed } from '@angular/core/testing';

import { EscalaService } from './escala.service';

describe('EscalaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EscalaService = TestBed.get(EscalaService);
    expect(service).toBeTruthy();
  });
});
