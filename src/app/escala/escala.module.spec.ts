import { EscalaModule } from './escala.module';

describe('EscalaModule', () => {
  let escalaModule: EscalaModule;

  beforeEach(() => {
    escalaModule = new EscalaModule();
  });

  it('should create an instance', () => {
    expect(escalaModule).toBeTruthy();
  });
});
