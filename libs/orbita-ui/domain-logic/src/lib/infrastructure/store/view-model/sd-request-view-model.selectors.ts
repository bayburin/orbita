import { createSelector } from '@ngrx/store';

import * as SdRequestSelectors from '../sd-request/sd-request.selectors';
import * as MessageViewModelSelectors from './message-view-model.selectors';
import * as WorkViewModelSelectors from './work-view-model.selectors';
import { SdRequestViewModel } from './../../../entities/view-models/sd-request-view-model.interface';
import { WorkViewModel } from './../../../entities/view-models/work-view-model.interface';
import { MessageViewModel } from './../../../entities/view-models/message-view-model.interface';

export const getAllViewModel = createSelector(
  SdRequestSelectors.getAllSorted,
  MessageViewModelSelectors.getEntitiesViewModel,
  WorkViewModelSelectors.getEntitiesViewModel,
  (sdRequests, messageEntities, workEntities): SdRequestViewModel[] =>
    sdRequests.map((sdRequest) => {
      const comments = sdRequest.comments.reduce(
        (arr, commentId) => (messageEntities[commentId] ? arr.concat(messageEntities[commentId]) : arr),
        [] as MessageViewModel[]
      );
      const works = sdRequest.works.reduce(
        (arr, workId) => (workEntities[workId] ? arr.concat(workEntities[workId]) : arr),
        [] as WorkViewModel[]
      );
      // Находит первую работу, у которой есть история
      const work = works.find((work) => work.histories.length);
      let lastHistory = null;

      // Вычисление последнего события для текущей заявки
      if (work) {
        lastHistory = works.reduce((last, work) => {
          if (!work.histories.length) {
            return last;
          }
          const history = work.histories.reduce((max, hist) => (hist.id > max.id ? hist : max), work.histories[0]);

          return history.id > last.id ? history : last;
        }, work.histories[0]);
      }

      return {
        ...sdRequest,
        lastHistoryId: lastHistory ? lastHistory.id : null,
        comments,
        works,
      };
    })
);
