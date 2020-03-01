import { TestBed } from '@angular/core/testing';

import { TrabalhadorService } from './trabalhador.service';

describe('TrabalhadorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrabalhadorService = TestBed.get(TrabalhadorService);
    expect(service).toBeTruthy();
  });
});
