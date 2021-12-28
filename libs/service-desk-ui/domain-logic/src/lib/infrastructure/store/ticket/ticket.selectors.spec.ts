import { Ticket } from '../../../entities/models/ticket.interface';
import { ticketAdapter, initialState } from './ticket.reducer';
import * as TicketSelectors from './ticket.selectors';

describe('TicketSelectors', () => {
  const error = { message: 'error message' };
  const createTicketEntity = (id: number, name = ''): Ticket =>
    ({
      id,
      name: name || `name-${id}`,
    } as unknown as Ticket);
  const arrEntities = [createTicketEntity(1), createTicketEntity(2), createTicketEntity(3)];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2],
  };
  const selectedId = 2;
  let state: any;

  beforeEach(() => {
    state = ticketAdapter.setAll(arrEntities, {
      ...initialState,
      loaded: true,
      selectedId,
      error,
    });
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(TicketSelectors.getLoaded.projector(state)).toEqual(true);
  });
  it('getAll() should return array of entities', () => {
    expect(TicketSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(TicketSelectors.getEntities.projector(state)).toEqual(entities);
  });

  it('getSelectedId() should return selected entity', () => {
    expect(TicketSelectors.getSelectedId.projector(state)).toEqual(selectedId);
  });

  it('getSelected() should return svtItem state', () => {
    expect(TicketSelectors.getSelected.projector(entities, selectedId)).toEqual(entities[selectedId]);
  });
});
