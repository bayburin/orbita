import { sdTicketAdapter, initialState } from './sd-ticket.reducer';
import * as SdTicketSelectors from './sd-ticket.selectors';
import { SdTicket } from './../../../entities/models/sd/sd-ticket.interface';

describe('SdTicketSelectors', () => {
  const createSdTicketEntity = (id: number, name = '') =>
    (({
      id,
      name: name || `name-${id}`,
    } as unknown) as SdTicket);
  const arrEntities = [createSdTicketEntity(1), createSdTicketEntity(2), createSdTicketEntity(3)];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2],
  };
  let state: any;

  beforeEach(() => {
    state = sdTicketAdapter.setAll(arrEntities, {
      ...initialState,
      loading: false,
      loaded: true,
      needTickets: true,
      error: 'error message',
    });
  });

  it('getLoading() should return "loading" attribute', () => {
    expect(SdTicketSelectors.getLoading.projector(state)).toEqual(false);
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(SdTicketSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getNeedTickets() should return "needTicket" attribute', () => {
    expect(SdTicketSelectors.getNeedTickets.projector(state)).toEqual(true);
  });

  it('getAll() should return array of entities', () => {
    expect(SdTicketSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getError() should return "error" attribute', () => {
    expect(SdTicketSelectors.getError.projector(state)).toEqual('error message');
  });

  it('getEntities() should return entities', () => {
    expect(SdTicketSelectors.getEntities.projector(state)).toEqual(entities);
  });
});
