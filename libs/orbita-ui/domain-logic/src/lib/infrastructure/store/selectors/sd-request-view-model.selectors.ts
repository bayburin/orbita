import { createSelector } from '@ngrx/store';
import { oFlatMap } from '@orbita/orbita-ui/utils';

import * as SdRequestSelectors from '../sd-request/sd-request.selectors';
import * as MessageViewModelSelectors from './message-view-model.selectors';
import * as WorkViewModelSelectors from './work-view-model.selectors';
import * as ApplicationSelectors from './../application/application.selectors';
import * as AttachmentSelectors from './../attachment/attachment.selectors';
import { SdRequestViewModel } from './../../../entities/view-models/sd-request-view-model.interface';
import { WorkViewModel } from './../../../entities/view-models/work-view-model.interface';
import { MessageViewModel } from './../../../entities/view-models/message-view-model.interface';
import { SdRequestViewForm } from './../../../entities/forms/sd-request-view-form.interface';
import { ParameterSchemaViewModelFactory } from '../../factories/parameter-shema-view-model.factory';

export const getAllViewModel = createSelector(
  SdRequestSelectors.getAll,
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

      return {
        ...sdRequest,
        application: applicationEntities[sdRequest.application_id],
        comments,
        works,
        attachments: [],
        parameter: null,
        histories: oFlatMap((work) => work.histories, works).sort((a, b) => (a.id > b.id ? 1 : -1)) || [],
        workflows: oFlatMap((work) => work.workflows, works).sort((a, b) => (a.id > b.id ? 1 : -1)) || [],
      };
    })
);

export const getSelectedEntityViewModel = createSelector(
  SdRequestSelectors.getSelectedEntity,
  MessageViewModelSelectors.getEntitiesViewModel,
  WorkViewModelSelectors.getEntitiesViewModel,
  ApplicationSelectors.getEntities,
  AttachmentSelectors.getEntities,
  (sdRequest, messageEntities, workEntities, applicationEntities, attachmentEntities): SdRequestViewModel => {
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
    const attachments = sdRequest.attachments.reduce(
      (arr, attachmentId) => (attachmentEntities[attachmentId] ? arr.concat(attachmentEntities[attachmentId]) : arr),
      []
    );
    const schemaPayload = ParameterSchemaViewModelFactory.createSchema(sdRequest.parameter);

    return {
      ...sdRequest,
      application,
      comments,
      works,
      attachments,
      parameter: {
        ...sdRequest.parameter,
        payload: schemaPayload,
      },
      histories: oFlatMap((work) => work.histories, works).sort((a, b) => (a.id > b.id ? 1 : -1)) || [],
      workflows: oFlatMap((work) => work.workflows, works).sort((a, b) => (a.id > b.id ? 1 : -1)) || [],
    };
  }
);

// export const getOrderedHistories = createSelector(getSelectedEntityViewModel, (sdRequest) =>
//   oFlatMap((work) => work.histories, sdRequest.works).sort((a, b) => (a.id > b.id ? 1 : -1))
// );

// export const getOrderedWorkflows = createSelector(getSelectedEntityViewModel, (sdRequest) =>
//   oFlatMap((work) => work.workflows, sdRequest.works).sort((a, b) => (a.id > b.id ? 1 : -1))
// );

export const getFormEntityViewModel = createSelector(SdRequestSelectors.getFormEntity, (entity: SdRequestViewForm) =>
  entity ? { ...entity, finished_at_plan: new Date(entity.finished_at_plan) } : entity
);

export const getNewFormCreatedViewModel = createSelector(
  SdRequestSelectors.getNewFormCreated,
  MessageViewModelSelectors.getEntitiesViewModel,
  WorkViewModelSelectors.getEntitiesViewModel,
  ApplicationSelectors.getEntities,
  AttachmentSelectors.getEntities,
  (sdRequest, messageEntities, workEntities, applicationEntities, attachmentEntities): SdRequestViewModel => {
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
    const attachments = sdRequest.attachments.reduce(
      (arr, attachmentId) => (attachmentEntities[attachmentId] ? arr.concat(attachmentEntities[attachmentId]) : arr),
      []
    );

    return {
      ...sdRequest,
      application,
      comments,
      works,
      attachments,
      parameter: null,
      histories: oFlatMap((work) => work.histories, works).sort((a, b) => (a.id > b.id ? 1 : -1)) || [],
      workflows: oFlatMap((work) => work.workflows, works).sort((a, b) => (a.id > b.id ? 1 : -1)) || [],
    };
  }
);
