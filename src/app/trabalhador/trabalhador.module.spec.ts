import { TrabalhadorModule } from './trabalhador.module';

describe('TrabalhadorModule', () => {
  let trabalhadorModule: TrabalhadorModule;

  beforeEach(() => {
    trabalhadorModule = new TrabalhadorModule();
  });

  it('should create an instance', () => {
    expect(trabalhadorModule).toBeTruthy();
  });
});
