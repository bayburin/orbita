import { Question } from '../../../entities/model/question.interface';
import { questionAdapter, QuestionPartialState, initialState } from './question.reducer';
import * as QuestionSelectors from './question.selectors';

describe('QuestionSelectors', () => {
  const error = { message: 'error message' };
  const createQuestionEntity = (id: number, name = ''): Question =>
    ({
      id,
      name: name || `name-${id}`,
    } as unknown as Question);
  const arrEntities = [createQuestionEntity(1), createQuestionEntity(2), createQuestionEntity(3)];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2],
  };
  const selectedId = 2;
  let state: any;

  beforeEach(() => {
    state = questionAdapter.setAll(arrEntities, {
      ...initialState,
      loading: true,
      selectedId,
      error,
    });
  });

  it('getAll() should return array of entities', () => {
    expect(QuestionSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(QuestionSelectors.getEntities.projector(state)).toEqual(entities);
  });
});
