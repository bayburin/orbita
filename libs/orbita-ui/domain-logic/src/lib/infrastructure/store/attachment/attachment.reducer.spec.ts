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

  describe('setAll()', () => {
    it('should change "loaded" and "entities" attributes', () => {
      const attachments = [createAttachmentEntity(1), createAttachmentEntity(2)];
      action = AttachmentActions.setAll({ attachments });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toEqual(2);
    });
  });

  describe('setAttachments()', () => {
    it('should change  "entities" attributes', () => {
      const attachments = [createAttachmentEntity(1), createAttachmentEntity(2)];
      action = AttachmentActions.setAttachments({ attachments });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toEqual(2);
    });
  });

  describe('download()', () => {
    it('should change  "entities" attributes', () => {
      const attachments = [createAttachmentEntity(1), createAttachmentEntity(2)];
      action = AttachmentActions.download({ attachment: attachments[1] });
      let result: State = reducer(initialState, action);
      action = AttachmentActions.download({ attachment: attachments[0] });
      result = reducer(result, action);

      expect(result.loadingIds).toEqual([2, 1]);
      expect(result.errorIds).toEqual([]);
    });
  });

  describe('downloadSuccess()', () => {
    it('should change  "entities" attributes', () => {
      const attachments = [createAttachmentEntity(1), createAttachmentEntity(2)];
      action = AttachmentActions.download({ attachment: attachments[1] });
      let result: State = reducer(initialState, action);
      action = AttachmentActions.download({ attachment: attachments[0] });
      result = reducer(result, action);
      action = AttachmentActions.downloadSuccess({ id: 1 });
      result = reducer(result, action);

      expect(result.loadingIds).toEqual([2]);
    });
  });

  describe('downloadFailure()', () => {
    it('should change  "entities" attributes', () => {
      const attachments = [createAttachmentEntity(1), createAttachmentEntity(2)];
      action = AttachmentActions.download({ attachment: attachments[1] });
      let result: State = reducer(initialState, action);
      action = AttachmentActions.download({ attachment: attachments[0] });
      result = reducer(result, action);
      action = AttachmentActions.downloadFailure({ id: 1 });
      result = reducer(result, action);

      expect(result.loadingIds).toEqual([2]);
      expect(result.errorIds).toEqual([1]);
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
