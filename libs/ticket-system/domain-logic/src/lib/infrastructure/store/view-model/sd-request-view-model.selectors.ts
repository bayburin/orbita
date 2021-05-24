import { createSelector } from '@ngrx/store';

import * as SdRequestSelectors from '../sd-request/sd-request.selectors';
import * as MessageSelectors from '../message/message.selectors';
import { SdRequestViewModel } from './../../../entities/view-models/sd-request-view-model.interface';

export const getAllViewModel = createSelector(
  SdRequestSelectors.getAll,
  MessageSelectors.getMessageEntities,
  (sdRequests, messageEntities): SdRequestViewModel[] =>
    sdRequests.map(sdRequest => {
      const comments = sdRequest.comments.map(commentId => messageEntities[commentId]);

      return {
        ...sdRequest,
        comments
      }
    })
)
