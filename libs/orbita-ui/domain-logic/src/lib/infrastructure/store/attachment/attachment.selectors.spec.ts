import { attachmentAdapter, initialState } from './attachment.reducer';
import * as AttachmentSelectors from './attachment.selectors';
import { Attachment } from './../../../entities/models/attachment.interface';

describe('AttachmentSelectors', () => {
  const createAttachmentEntity = (id: number, name = '') =>
    (({
      id,
      name: name || `name-${id}`,
    } as unknown) as Attachment);
  const arrEntities = [createAttachmentEntity(1), createAttachmentEntity(2), createAttachmentEntity(3)];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2],
  };
  let state: any;

  beforeEach(() => {
    state = attachmentAdapter.setAll(arrEntities, {
      ...initialState,
      loaded: true,
    });
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(AttachmentSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getAll() should return array of entities', () => {
    expect(AttachmentSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(AttachmentSelectors.getEntities.projector(state)).toEqual(entities);
  });
});
