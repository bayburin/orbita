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
import { ClaimApplicationViewModel } from './../../../entities/view-models/claim-application-view-model.interface';
import { Attachment } from './../../../entities/models/attachment.interface';

export const getAllViewModel = createSelector(
  SdRequestSelectors.getAll,
  MessageViewModelSelectors.getEntitiesViewModel,
  WorkViewModelSelectors.getEntitiesViewModel,
  ApplicationSelectors.getEntities,
  (sdRequests, messageEntities, workEntities, applicationEntities): SdRequestViewModel[] =>
    sdRequests.map((sdRequest) => {
      const comments = sdRequest.comments.reduce<MessageViewModel[]>((arr, commentId) => {
        if (messageEntities[commentId]) {
          arr.push(messageEntities[commentId]);
        }

        return arr;
      }, []);
      const works = sdRequest.works.reduce<WorkViewModel[]>((arr, workId) => {
        if (workEntities[workId]) {
          arr.push(workEntities[workId]);
        }

        return arr;
      }, []);
      const claim_applications = sdRequest.claim_applications.reduce<ClaimApplicationViewModel[]>((arr, claim_app) => {
        if (applicationEntities[claim_app.application_id]) {
          arr.push({ ...claim_app, application: applicationEntities[claim_app.application_id] });
        }

        return arr;
      }, []);

      return {
        ...sdRequest,
        claim_applications,
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

    const comments = sdRequest.comments.reduce<MessageViewModel[]>((arr, commentId) => {
      if (messageEntities[commentId]) {
        arr.push(messageEntities[commentId]);
      }

      return arr;
    }, []);
    const works = sdRequest.works.reduce<WorkViewModel[]>((arr, workId) => {
      if (workEntities[workId]) {
        arr.push(workEntities[workId]);
      }

      return arr;
    }, []);
    const attachments = sdRequest.attachments.reduce<Attachment[]>((arr, attachmentId) => {
      if (attachmentEntities[attachmentId]) {
        arr.push(attachmentEntities[attachmentId]);
      }

      return arr;
    }, []);
    const schemaPayload = ParameterSchemaViewModelFactory.createSchema(sdRequest.parameter);
    const claim_applications = sdRequest.claim_applications.reduce<ClaimApplicationViewModel[]>((arr, claim_app) => {
      if (applicationEntities[claim_app.application_id]) {
        arr.push({ ...claim_app, application: applicationEntities[claim_app.application_id] });
      }

      return arr;
    }, []);

    return {
      ...sdRequest,
      claim_applications,
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

    const comments = sdRequest.comments.reduce<MessageViewModel[]>((arr, commentId) => {
      if (messageEntities[commentId]) {
        arr.push(messageEntities[commentId]);
      }

      return arr;
    }, []);
    const works = sdRequest.works.reduce<WorkViewModel[]>((arr, workId) => {
      if (workEntities[workId]) {
        arr.push(workEntities[workId]);
      }

      return arr;
    }, []);
    const attachments = sdRequest.attachments.reduce<Attachment[]>((arr, attachmentId) => {
      if (attachmentEntities[attachmentId]) {
        arr.push(attachmentEntities[attachmentId]);
      }

      return arr;
    }, []);
    const claim_applications = sdRequest.claim_applications.reduce<ClaimApplicationViewModel[]>((arr, claim_app) => {
      if (applicationEntities[claim_app.application_id]) {
        arr.push({ ...claim_app, application: applicationEntities[claim_app.application_id] });
      }

      return arr;
    }, []);

    return {
      ...sdRequest,
      claim_applications,
      comments,
      works,
      attachments,
      parameter: null,
      histories: oFlatMap((work) => work.histories, works).sort((a, b) => (a.id > b.id ? 1 : -1)) || [],
      workflows: oFlatMap((work) => work.workflows, works).sort((a, b) => (a.id > b.id ? 1 : -1)) || [],
    };
  }
);
