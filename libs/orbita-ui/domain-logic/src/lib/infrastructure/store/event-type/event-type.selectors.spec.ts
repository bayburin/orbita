import { eventTypeAdapter, initialState } from './event-type.reducer';
import * as EventTypeSelectors from './event-type.selectors';
import { EventType } from './../../../entities/models/event-type.interface';

describe('EventTypeSelectors', () => {
  const createEventTypeEntity = (id: number, name = '') =>
    (({
      id,
      name: name || `name-${id}`,
    } as unknown) as EventType);
  const arrEntities = [
    createEventTypeEntity(1),
    createEventTypeEntity(2),
    createEventTypeEntity(3),
  ];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2],
  };
  let state: any;

  beforeEach(() => {
    state = eventTypeAdapter.setAll(arrEntities, {
      ...initialState,
      loaded: true,
    });
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(EventTypeSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getAll() should return array of entities', () => {
    expect(EventTypeSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(EventTypeSelectors.getEntities.projector(state)).toEqual(entities);
  });
});
