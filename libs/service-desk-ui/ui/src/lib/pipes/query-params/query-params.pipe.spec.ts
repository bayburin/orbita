import { QueryParamsPipe } from './query-params.pipe';

describe('QueryParamsPipe', () => {
  let pipe: QueryParamsPipe;

  beforeEach(() => {
    pipe = new QueryParamsPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('return null', () => {
    expect(pipe.transform(null)).toBeNull();
    expect(pipe.transform('')).toBeNull();
    expect(pipe.transform({})).toBeNull();
    expect(pipe.transform([])).toBeNull();
  });

  it('return transformed data', () => {
    expect(pipe.transform({ foo: 'bar' })).toBe('{<br/>&nbsp;&nbsp;&nbsp;&nbsp;"foo":&nbsp;"bar"<br/>}');
  });
});
