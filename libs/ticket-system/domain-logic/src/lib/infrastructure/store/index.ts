import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromSdRequest from './sd-request/sd-request.reducer';
import * as fromFreeSdRequestType from './free-sd-request-type/free-sd-request-type.reducer';
import * as fromUser from './user/user.reducer';

export const TICKET_SYSTEM_FEATURE_KEY = 'ticketSystem';

export interface TicketSystemState extends
  fromSdRequest.SdRequestPartialState,
  fromFreeSdRequestType.FreeSdRequestTypePartialState,
  fromUser.UserPartialState { }

export const reducer: ActionReducerMap<TicketSystemState, any> = {
  [fromSdRequest.SD_REQUEST_FEATURE_KEY]: fromSdRequest.reducer,
  [fromFreeSdRequestType.FREE_SD_REQUEST_TYPE_FEATURE_KEY]: fromFreeSdRequestType.reducer,
  [fromUser.USER_FEATURE_KEY]: fromUser.reducer
}

export const getTicketSystemState = createFeatureSelector<TicketSystemState>(TICKET_SYSTEM_FEATURE_KEY);
