import { CapitalizePipe } from './capitalize.pipe';

describe('CapitalizePipe', () => {
  let pipe: CapitalizePipe;

  beforeEach(() => {
    pipe = new CapitalizePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should capitalize word', () => {
    expect(pipe.transform('VALUE')).toBe('Value');
    expect(pipe.transform('TEST-VALUE')).toBe('Test-Value');
    expect(pipe.transform('VALUE TEST-VALUE')).toBe('Value Test-Value');
  });
});
