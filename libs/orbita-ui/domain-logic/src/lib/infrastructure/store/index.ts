import { ActionReducerMap, createFeatureSelector, MetaReducer, Action, ActionReducer, INIT, UPDATE } from '@ngrx/store';

import { processSdRequestTableFilters } from '../utils/process-sd-request-table-filters.function';

import * as fromApp from './app/app.reducer';
import * as fromSdRequest from './sd-request/sd-request.reducer';
import * as fromUser from './user/user.reducer';
import * as fromGroup from './group/group.reducer';
import * as fromMessage from './message/message.reducer';
import * as fromWork from './work/work.reducer';
import * as fromHistory from './history/history.reducer';
import * as fromEventType from './event-type/event-type.reducer';
// import * as fromParameter from './parameter/parameter.reducer';
import * as fromWorker from './worker/worker.reducer';
import * as fromApplication from './application/application.reducer';
import * as fromSdService from './sd-service/sd-service.reducer';
import * as fromSdTicket from './sd-ticket/sd-ticket.reducer';
import * as fromEmployee from './employee/employee.reducer';
import * as fromSvtItem from './svt-item/svt-item.reducer';
import * as fromHost from './host/host.reducer';
import * as fromAttachment from './attachment/attachment.reducer';
import * as fromSvtType from './svt-type/svt-type.reducer';
import * as fromSvtWorkplaceCount from './svt-workplace-count/svt-workplace-count.reducer';
import * as fromSvtWorkplaceType from './svt-workplace-type/svt-workplace-type.reducer';
import * as fromSvtWorkplace from './svt-workplace/svt-workplace.reducer';

export const TICKET_SYSTEM_FEATURE_KEY = 'orbitaUi';

export interface OrbitaUiState
  extends fromApp.AppPartialState,
    fromSdRequest.SdRequestPartialState,
    fromUser.UserPartialState,
    fromGroup.GroupPartialState,
    fromMessage.MessagePartialState,
    fromWork.WorkPartialState,
    fromHistory.HistoryPartialState,
    fromEventType.EventTypePartialState,
    // fromParameter.ParameterPartialState,
    fromWorker.WorkerPartialState,
    fromApplication.ApplicationPartialState,
    fromSdService.SdServicePartialState,
    fromSdTicket.SdTicketPartialState,
    fromEmployee.EmployeePartialState,
    fromHost.HostPartialState,
    fromAttachment.AttachmentPartialState,
    fromSvtItem.SvtItemPartialState,
    fromSvtType.SvtTypePartialState,
    fromSvtWorkplaceCount.SvtWorkplaceCountPartialState,
    fromSvtWorkplaceType.SvtWorkplaceTypePartialState,
    fromSvtWorkplace.SvtWorkplacePartialState {}

export const reducer: ActionReducerMap<OrbitaUiState> = {
  [fromApp.APP_FEATURE_KEY]: fromApp.reducer,
  [fromSdRequest.SD_REQUEST_FEATURE_KEY]: fromSdRequest.reducer,
  [fromUser.USER_FEATURE_KEY]: fromUser.reducer,
  [fromGroup.GROUP_FEATURE_KEY]: fromGroup.reducer,
  [fromMessage.MESSAGE_FEATURE_KEY]: fromMessage.reducer,
  [fromWork.WORK_FEATURE_KEY]: fromWork.reducer,
  [fromHistory.HISTORY_FEATURE_KEY]: fromHistory.reducer,
  [fromEventType.EVENT_TYPE_FEATURE_KEY]: fromEventType.reducer,
  // [fromParameter.PARAMETER_FEATURE_KEY]: fromParameter.reducer,
  [fromWorker.WORKER_FEATURE_KEY]: fromWorker.reducer,
  [fromApplication.APPLICATION_FEATURE_KEY]: fromApplication.reducer,
  [fromSdService.SD_SERVICE_FEATURE_KEY]: fromSdService.reducer,
  [fromSdTicket.SD_TICKET_FEATURE_KEY]: fromSdTicket.reducer,
  [fromEmployee.EMPLOYEE_FEATURE_KEY]: fromEmployee.reducer,
  [fromHost.HOST_FEATURE_KEY]: fromHost.reducer,
  [fromAttachment.ATTACHMENT_FEATURE_KEY]: fromAttachment.reducer,
  [fromSvtItem.SVT_ITEM_FEATURE_KEY]: fromSvtItem.reducer,
  [fromSvtType.SVT_TYPE_FEATURE_KEY]: fromSvtType.reducer,
  [fromSvtWorkplaceCount.SVT_WORKPLACE_COUNT_FEATURE_KEY]: fromSvtWorkplaceCount.reducer,
  [fromSvtWorkplaceType.SVT_WORKPLACE_TYPE_FEATURE_KEY]: fromSvtWorkplaceType.reducer,
  [fromSvtWorkplace.SVT_WORKPLACE_FEATURE_KEY]: fromSvtWorkplace.reducer,
};

export const initialState: OrbitaUiState = {
  [fromApp.APP_FEATURE_KEY]: fromApp.initialState,
  [fromSdRequest.SD_REQUEST_FEATURE_KEY]: fromSdRequest.initialState,
  [fromUser.USER_FEATURE_KEY]: fromUser.initialState,
  [fromGroup.GROUP_FEATURE_KEY]: fromGroup.initialState,
  [fromMessage.MESSAGE_FEATURE_KEY]: fromMessage.initialState,
  [fromWork.WORK_FEATURE_KEY]: fromWork.initialState,
  [fromHistory.HISTORY_FEATURE_KEY]: fromHistory.initialState,
  [fromEventType.EVENT_TYPE_FEATURE_KEY]: fromEventType.initialState,
  // [fromParameter.PARAMETER_FEATURE_KEY]: fromParameter.initialState,
  [fromWorker.WORKER_FEATURE_KEY]: fromWorker.initialState,
  [fromApplication.APPLICATION_FEATURE_KEY]: fromApplication.initialState,
  [fromSdService.SD_SERVICE_FEATURE_KEY]: fromSdService.initialState,
  [fromSdTicket.SD_TICKET_FEATURE_KEY]: fromSdTicket.initialState,
  [fromEmployee.EMPLOYEE_FEATURE_KEY]: fromEmployee.initialState,
  [fromHost.HOST_FEATURE_KEY]: fromHost.initialState,
  [fromAttachment.ATTACHMENT_FEATURE_KEY]: fromAttachment.initialState,
  [fromSvtItem.SVT_ITEM_FEATURE_KEY]: fromSvtItem.initialState,
  [fromSvtType.SVT_TYPE_FEATURE_KEY]: fromSvtType.initialState,
  [fromSvtWorkplaceCount.SVT_WORKPLACE_COUNT_FEATURE_KEY]: fromSvtWorkplaceCount.initialState,
  [fromSvtWorkplaceType.SVT_WORKPLACE_TYPE_FEATURE_KEY]: fromSvtWorkplaceType.initialState,
  [fromSvtWorkplace.SVT_WORKPLACE_FEATURE_KEY]: fromSvtWorkplace.initialState,
};

export const getOrbitaUiState = createFeatureSelector<OrbitaUiState>(TICKET_SYSTEM_FEATURE_KEY);

export function metaReducer(reducer: ActionReducer<OrbitaUiState>): ActionReducer<OrbitaUiState | undefined> {
  return (state: OrbitaUiState | undefined, action: Action) => {
    // if (action.type === INIT || action.type === UPDATE) {
    //   if (!state) {
    //     return undefined;
    //   }

    //   const storageValue = localStorage.getItem(`${fromSdRequest.SD_REQUEST_FEATURE_KEY}Table`);

    //   if (storageValue) {
    //     try {
    //       const meta = JSON.parse(storageValue);

    //       return {
    //         ...state,
    //         [fromSdRequest.SD_REQUEST_FEATURE_KEY]: {
    //           ...state[fromSdRequest.SD_REQUEST_FEATURE_KEY],
    //           firstRowIndex: meta.first,
    //           perPage: meta.rows,
    //           sortField: meta.sortField,
    //           sortOrder: meta.sortOrder,
    //           filters: processSdRequestTableFilters(meta.filters),
    //         },
    //       };
    //     } catch (e) {
    //       console.log('????????????. ???? ?????????????? ?????????????? ???????????? ???????????????? ???? localStorage');
    //       console.log(e);
    //       localStorage.removeItem(fromSdRequest.SD_REQUEST_FEATURE_KEY);
    //     }
    //   }
    // }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer[] = [metaReducer];
