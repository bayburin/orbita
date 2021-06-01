import { FioMiddleNamePipe } from './fio-middle-name.pipe';

describe('FioMiddleNamePipe', () => {
  let pipe: FioMiddleNamePipe;

  beforeEach(() => {
    pipe = new FioMiddleNamePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return middlename', () => {
    const user = 'Фамилия Имя Отчество';

    expect(pipe.transform(user)).toEqual('Фамилия');
  });
});
