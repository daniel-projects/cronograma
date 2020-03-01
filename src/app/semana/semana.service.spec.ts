import { TestBed } from '@angular/core/testing';

import { SemanaService } from './semana.service';

describe('SemanaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SemanaService = TestBed.get(SemanaService);
    expect(service).toBeTruthy();
  });
});
