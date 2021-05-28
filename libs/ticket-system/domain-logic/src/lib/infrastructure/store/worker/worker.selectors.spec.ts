import { workerAdapter, initialState } from './worker.reducer';
import * as WorkerSelectors from './worker.selectors';
import { Worker } from './../../../entities/models/worker.interface';

describe('WorkerSelectors', () => {
  const createWorkerEntity = (id: number, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as unknown as Worker);
  const arrEntities = [
    createWorkerEntity(1),
    createWorkerEntity(2),
    createWorkerEntity(3)
  ];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2]
  };
  let state: any;

  beforeEach(() => {
    state = workerAdapter.setAll(
      arrEntities,
      {
        ...initialState,
        loaded: true
      }
    );
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(WorkerSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getAll() should return array of entities', () => {
    expect(WorkerSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(WorkerSelectors.getEntities.projector(state)).toEqual(entities);
  });
});
