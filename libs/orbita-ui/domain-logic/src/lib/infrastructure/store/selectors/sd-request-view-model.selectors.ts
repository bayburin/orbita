import { createSelector } from '@ngrx/store';
import { oFlatMap } from '@orbita/orbita-ui/utils';

import * as SdRequestSelectors from '../sd-request/sd-request.selectors';
import * as MessageViewModelSelectors from './message-view-model.selectors';
import * as WorkViewModelSelectors from './work-view-model.selectors';
import * as ApplicationSelectors from './../application/application.selectors';
import { SdRequestViewModel } from './../../../entities/view-models/sd-request-view-model.interface';
import { WorkViewModel } from './../../../entities/view-models/work-view-model.interface';
import { MessageViewModel } from './../../../entities/view-models/message-view-model.interface';
import { SdRequestViewForm } from './../../../entities/forms/sd-request-view-form.interface';

export const getAllViewModel = createSelector(
  SdRequestSelectors.getAllSorted,
  MessageViewModelSelectors.getEntitiesViewModel,
  WorkViewModelSelectors.getEntitiesViewModel,
  ApplicationSelectors.getEntities,
  (sdRequests, messageEntities, workEntities, applicationEntities): SdRequestViewModel[] =>
    sdRequests.map((sdRequest) => {
      const comments = sdRequest.comments.reduce(
        (arr, commentId) => (messageEntities[commentId] ? arr.concat(messageEntities[commentId]) : arr),
        [] as MessageViewModel[]
      );
      const works = sdRequest.works.reduce(
        (arr, workId) => (workEntities[workId] ? arr.concat(workEntities[workId]) : arr),
        [] as WorkViewModel[]
      );
      const application = applicationEntities[sdRequest.application_id];
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
        application,
        lastHistory,
        comments,
        works,
      };
    })
);

export const getSelectedEntityViewModel = createSelector(
  SdRequestSelectors.getSelectedEntity,
  MessageViewModelSelectors.getEntitiesViewModel,
  WorkViewModelSelectors.getEntitiesViewModel,
  ApplicationSelectors.getEntities,
  (sdRequest, messageEntities, workEntities, applicationEntities): SdRequestViewModel => {
    if (!sdRequest) {
      return null;
    }

    const comments = sdRequest.comments.reduce(
      (arr, commentId) => (messageEntities[commentId] ? arr.concat(messageEntities[commentId]) : arr),
      [] as MessageViewModel[]
    );
    const works = sdRequest.works.reduce(
      (arr, workId) => (workEntities[workId] ? arr.concat(workEntities[workId]) : arr),
      [] as WorkViewModel[]
    );
    const application = applicationEntities[sdRequest.application_id];

    return {
      ...sdRequest,
      application,
      comments,
      works,
    };
  }
);

export const getOrderedHistories = createSelector(getSelectedEntityViewModel, (sdRequest) =>
  oFlatMap((work) => work.histories, sdRequest.works).sort((a, b) => (a.id > b.id ? 1 : -1))
);

export const getOrderedWorkflows = createSelector(getSelectedEntityViewModel, (sdRequest) =>
  oFlatMap((work) => work.workflows, sdRequest.works).sort((a, b) => (a.id > b.id ? 1 : -1))
);

export const getFormEntityViewModel = createSelector(SdRequestSelectors.getFormEntity, (entity: SdRequestViewForm) =>
  entity ? { ...entity, finished_at_plan: new Date(entity.finished_at_plan) } : entity
);
