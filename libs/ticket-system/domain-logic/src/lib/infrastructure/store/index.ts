import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromApp from './app/app.reducer';
import * as fromSdRequest from './sd-request/sd-request.reducer';
import * as fromFreeSdRequestType from './free-sd-request-type/free-sd-request-type.reducer';
import * as fromUser from './user/user.reducer';
import * as fromGroup from './group/group.reducer';
import * as fromMessage from './message/message.reducer';

export const TICKET_SYSTEM_FEATURE_KEY = 'ticketSystem';

export interface TicketSystemState extends
  fromApp.AppPartialState,
  fromSdRequest.SdRequestPartialState,
  fromFreeSdRequestType.FreeSdRequestTypePartialState,
  fromUser.UserPartialState,
  fromGroup.GroupPartialState,
  fromMessage.MessagePartialState { }

export const reducer: ActionReducerMap<TicketSystemState> = {
  [fromApp.APP_FEATURE_KEY]: fromApp.reducer,
  [fromSdRequest.SD_REQUEST_FEATURE_KEY]: fromSdRequest.reducer,
  [fromFreeSdRequestType.FREE_SD_REQUEST_TYPE_FEATURE_KEY]: fromFreeSdRequestType.reducer,
  [fromUser.USER_FEATURE_KEY]: fromUser.reducer,
  [fromGroup.GROUP_FEATURE_KEY]: fromGroup.reducer,
  [fromMessage.MESSAGE_FEATURE_KEY]: fromMessage.reducer
}

export const getTicketSystemState = createFeatureSelector<TicketSystemState>(TICKET_SYSTEM_FEATURE_KEY);
