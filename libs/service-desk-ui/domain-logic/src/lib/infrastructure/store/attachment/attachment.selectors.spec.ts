import { Attachment } from '../../../entities/model/attachment.interface';
import { attachmentAdapter, initialState } from './attachment.reducer';
import * as AttachmentSelectors from './attachment.selectors';

describe('AttachmentSelectors', () => {
  const error = { message: 'error message' };
  const createAttachmentEntity = (id: number, filename = ''): Attachment =>
    ({
      id,
      filename: filename || `filename-${id}`,
    } as Attachment);
  const arrEntities = [createAttachmentEntity(1), createAttachmentEntity(2), createAttachmentEntity(3)];
  const entities = {
    1: arrEntities[0],
    2: arrEntities[1],
    3: arrEntities[2],
  };
  const selectedId = 2;
  let state: any;

  beforeEach(() => {
    state = attachmentAdapter.setAll(arrEntities, {
      ...initialState,
      loaded: true,
      loading: true,
      selectedId,
      error,
    });
  });

  it('getLoaded() should return "loaded" attribute', () => {
    expect(AttachmentSelectors.getLoaded.projector(state)).toEqual(true);
  });

  it('getLoading() should return "loading" attribute', () => {
    expect(AttachmentSelectors.getLoading.projector(state)).toEqual(true);
  });

  it('getError() should return "error" attribute', () => {
    expect(AttachmentSelectors.getError.projector(state)).toEqual(error);
  });

  it('getAll() should return array of entities', () => {
    expect(AttachmentSelectors.getAll.projector(state)).toEqual(arrEntities);
  });

  it('getEntities() should return entities', () => {
    expect(AttachmentSelectors.getEntities.projector(state)).toEqual(entities);
  });
});
