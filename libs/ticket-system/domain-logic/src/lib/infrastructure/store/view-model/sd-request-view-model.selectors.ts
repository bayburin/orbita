import { createSelector } from '@ngrx/store';

import * as SdRequestSelectors from '../sd-request/sd-request.selectors';
import * as MessageViewModelSelectors from './message-view-model.selectors';
import * as WorkViewModelSelectors from './work-view-model.selectors';
import { SdRequestViewModel } from './../../../entities/view-models/sd-request-view-model.interface';

export const getAllViewModel = createSelector(
  SdRequestSelectors.getAll,
  MessageViewModelSelectors.getEntitiesViewModel,
  WorkViewModelSelectors.getEntitiesViewModel,
  (sdRequests, messageEntities, workEntities): SdRequestViewModel[] =>
    sdRequests.map(sdRequest => {
      const comments = sdRequest.comments.map(commentId => messageEntities[commentId]);
      const works = sdRequest.works.map(workId => workEntities[workId]);

      return {
        ...sdRequest,
        comments,
        works
      }
    })
)
