import { AtividadeModule } from './atividade.module';

describe('AtividadeModule', () => {
  let atividadeModule: AtividadeModule;

  beforeEach(() => {
    atividadeModule = new AtividadeModule();
  });

  it('should create an instance', () => {
    expect(atividadeModule).toBeTruthy();
  });
});
