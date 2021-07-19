import { Action } from '@ngrx/store';

import { Attachment } from './../../../entities/models/attachment.interface';
import * as AttachmentActions from './attachment.actions';
import { State, initialState, reducer } from './attachment.reducer';

describe('AttachmentReducer', () => {
  let action: Action;
  const createAttachmentEntity = (id: number, name = '') =>
    (({
      id,
      name: name || `name-${id}`,
    } as unknown) as Attachment);

  describe('SetAll()', () => {
    it('should change "loaded" and "entities" attributes', () => {
      const attachments = [createAttachmentEntity(1), createAttachmentEntity(2)];
      action = AttachmentActions.setAll({ attachments });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toEqual(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
