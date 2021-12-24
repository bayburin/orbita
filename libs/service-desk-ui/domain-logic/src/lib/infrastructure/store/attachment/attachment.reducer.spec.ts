import { Action } from '@ngrx/store';

import * as AttachmentActions from './attachment.actions';
import { Attachment } from '../../../entities/model/attachment.interface';
import { State, initialState, reducer } from './attachment.reducer';

describe('AttachmentReducer', () => {
  let action: Action;
  const createAttachment = (id: number, filename = ''): Attachment =>
    ({
      id,
      filename: filename || `filename-${id}`,
    } as Attachment);

  describe('setEntities', () => {
    it('should change attributes', () => {
      const entities = { 111: createAttachment(111), 222: createAttachment(222) };
      action = AttachmentActions.setEntities({ entities });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(2);
    });
  });

  describe('download()', () => {
    it('should change attributes', () => {
      const attachments = [createAttachment(1), createAttachment(2)];
      action = AttachmentActions.download({ attachment: attachments[1] });
      let result: State = reducer(initialState, action);
      action = AttachmentActions.download({ attachment: attachments[0] });
      result = reducer(result, action);

      expect(result.loadingIds).toEqual([2, 1]);
      expect(result.errorIds).toEqual([]);
    });
  });

  describe('downloadSuccess()', () => {
    it('should change attributes', () => {
      initialState.loadingIds = [1, 2];
      action = AttachmentActions.downloadSuccess({ id: 1 });
      const result: State = reducer(initialState, action);

      expect(result.loadingIds).toEqual([2]);
    });
  });

  describe('downloadFailure()', () => {
    it('should change attributes', () => {
      initialState.loadingIds = [1, 2];
      action = AttachmentActions.downloadFailure({ id: 1 });
      const result: State = reducer(initialState, action);

      expect(result.loadingIds).toEqual([2]);
      expect(result.errorIds).toEqual([1]);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
