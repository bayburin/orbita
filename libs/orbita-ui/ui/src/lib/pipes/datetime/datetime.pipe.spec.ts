import { DatetimePipe } from './datetime.pipe';

describe('DatetimePipe', () => {
  let pipe: DatetimePipe;

  beforeEach(() => {
    pipe = new DatetimePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format datetime value', () => {
    const datetime = '2021-02-22T09:44:10.173+07:00';

    expect(pipe.transform(datetime)).toEqual('22.02.21 09:44');
  });

  it('should return empty string if datetime is null', () => {
    expect(pipe.transform(null)).toEqual('');
  });
});
