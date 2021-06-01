import { FioInitialsPipe } from './fio-initials.pipe';

describe('FioInitialsPipe', () => {
  let pipe: FioInitialsPipe;

  beforeEach(() => {
    pipe = new FioInitialsPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return abbreviated name', () => {
    expect(pipe.transform('Фамилия Имя Отчество')).toEqual('Фамилия И. О.');
    expect(pipe.transform('Фамилия Имя')).toEqual('Фамилия И.');
    expect(pipe.transform('Фамилия')).toEqual('Фамилия');
  });
});
