import { KaseStatus } from '../../../entities/model/kase-status.interface';
import { Kase } from './../../../entities/model/kase.interface';
import { kaseAdapter, KasePartialState, initialState } from './kase.reducer';
import * as KaseSelectors from './kase.selectors';

describe('KaseSelectors', () => {
  const error = { message: 'error message' };
  const createKaseEntity = (case_id: number, desc = ''): Kase =>
    ({
      case_id,
      desc: desc || `desc-${case_id}`,
    } as Kase);

  const arrEntities = [createKaseEntity(1), createKaseEntity(2), createKaseEntity(3)];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2],
  };
  const selectedId = 2;
  const statuses = [{ id: 1 }, { id: 2 }] as KaseStatus[];
  const serviceIds = [1, 2, 3];
  let state: any;

  beforeEach(() => {
    state = kaseAdapter.setAll(arrEntities, {
      ...initialState,
      initLoading: false,
      loaded: true,
      loading: true,
      selectedId,
      error,
      statuses,
      serviceIds,
    });
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(KaseSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getLoading() should return "loading" attribute', () => {
    expect(KaseSelectors.getLoading.projector(state)).toEqual(true);
  });

  it('getInitLoading() should return "initLoading" attribute', () => {
    expect(KaseSelectors.getInitLoading.projector(state)).toEqual(false);
  });

  it('getError() should return "error" attribute', () => {
    expect(KaseSelectors.getError.projector(state)).toEqual(error);
  });

  it('getAll() should return array of entities', () => {
    expect(KaseSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(KaseSelectors.getEntities.projector(state)).toEqual(entities);
  });

  it('getStatuses() should return entities', () => {
    expect(KaseSelectors.getStatuses.projector(state)).toEqual(statuses);
  });

  it('getStatuses() should return entities', () => {
    expect(KaseSelectors.getServiceIds.projector(state)).toEqual(serviceIds);
  });
});
