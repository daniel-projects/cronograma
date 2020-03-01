import { SemanaModule } from './semana.module';

describe('SemanaModule', () => {
  let semanaModule: SemanaModule;

  beforeEach(() => {
    semanaModule = new SemanaModule();
  });

  it('should create an instance', () => {
    expect(semanaModule).toBeTruthy();
  });
});
