import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromApp from './app/app.reducer';
import * as fromSdRequest from './sd-request/sd-request.reducer';
import * as fromFreeSdRequestType from './free-sd-request-type/free-sd-request-type.reducer';
import * as fromUser from './user/user.reducer';
import * as fromGroup from './group/group.reducer';
import * as fromMessage from './message/message.reducer';
import * as fromWork from './work/work.reducer';
import * as fromHistory from './history/history.reducer';
import * as fromEventType from './event-type/event-type.reducer';
import * as fromParameter from './parameter/parameter.reducer';
import * as fromWorker from './worker/worker.reducer';

export const TICKET_SYSTEM_FEATURE_KEY = 'orbitaUi';

export interface OrbitaUiState
  extends fromApp.AppPartialState,
    fromSdRequest.SdRequestPartialState,
    fromFreeSdRequestType.FreeSdRequestTypePartialState,
    fromUser.UserPartialState,
    fromGroup.GroupPartialState,
    fromMessage.MessagePartialState,
    fromWork.WorkPartialState,
    fromHistory.HistoryPartialState,
    fromEventType.EventTypePartialState,
    fromParameter.ParameterPartialState,
    fromWorker.WorkerPartialState {}

export const reducer: ActionReducerMap<OrbitaUiState> = {
  [fromApp.APP_FEATURE_KEY]: fromApp.reducer,
  [fromSdRequest.SD_REQUEST_FEATURE_KEY]: fromSdRequest.reducer,
  [fromFreeSdRequestType.FREE_SD_REQUEST_TYPE_FEATURE_KEY]:
    fromFreeSdRequestType.reducer,
  [fromUser.USER_FEATURE_KEY]: fromUser.reducer,
  [fromGroup.GROUP_FEATURE_KEY]: fromGroup.reducer,
  [fromMessage.MESSAGE_FEATURE_KEY]: fromMessage.reducer,
  [fromWork.WORK_FEATURE_KEY]: fromWork.reducer,
  [fromHistory.HISTORY_FEATURE_KEY]: fromHistory.reducer,
  [fromEventType.EVENT_TYPE_FEATURE_KEY]: fromEventType.reducer,
  [fromParameter.PARAMETER_FEATURE_KEY]: fromParameter.reducer,
  [fromWorker.WORKER_FEATURE_KEY]: fromWorker.reducer,
};

export const getOrbitaUiState = createFeatureSelector<OrbitaUiState>(
  TICKET_SYSTEM_FEATURE_KEY
);
