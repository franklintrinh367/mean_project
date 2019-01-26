import { FirstErrPipePipe } from './first-err-pipe.pipe';

describe('FirstErrPipePipe', () => {
  it('create an instance', () => {
    const pipe = new FirstErrPipePipe();
    expect(pipe).toBeTruthy();
  });
});
