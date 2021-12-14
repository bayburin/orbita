import { Answer } from '../../../entities/model/answer.interface';
import { answerAdapter, initialState } from './answer.reducer';
import * as AnswerSelectors from './answer.selectors';

describe('AnswerSelectors', () => {
  const error = { message: 'error message' };
  const createAnswerEntity = (id: number, answer = ''): Answer =>
    ({
      id,
      answer: answer || `answer-${id}`,
    } as Answer);
  const arrEntities = [createAnswerEntity(1), createAnswerEntity(2), createAnswerEntity(3)];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2],
  };
  let state: any;

  beforeEach(() => {
    state = answerAdapter.setAll(arrEntities, {
      ...initialState,
      loaded: true,
      loading: true,
      error,
    });
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(AnswerSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getLoading() should return "loading" attribute', () => {
    expect(AnswerSelectors.getLoading.projector(state)).toEqual(true);
  });

  it('getError() should return "error" attribute', () => {
    expect(AnswerSelectors.getError.projector(state)).toEqual(error);
  });

  it('getAll() should return array of entities', () => {
    expect(AnswerSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(AnswerSelectors.getEntities.projector(state)).toEqual(entities);
  });
});
