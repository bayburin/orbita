import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromCategory from './category/category.reducer';
import * as fromService from './service/service.reducer';
import * as fromTicket from './ticket/ticket.reducer';
import * as fromUserRecommendation from './user-recommendation/user-recommendation.reducer';

export interface ServiceDeskUiState
  extends fromCategory.CategoryPartialState,
    fromService.ServicePartialState,
    fromTicket.TicketPartialState,
    fromUserRecommendation.UserRecommendationPartialState {}

export const SERVICE_DESK_SYSTEM_FEATURE_KEY = 'serviceDeskUi';

export const reducer: ActionReducerMap<ServiceDeskUiState> = {
  [fromCategory.CATEGORY_FEATURE_KEY]: fromCategory.reducer,
  [fromService.SERVICE_FEATURE_KEY]: fromService.reducer,
  [fromTicket.TICKET_FEATURE_KEY]: fromTicket.reducer,
  [fromUserRecommendation.USER_RECOMMENDATION_FEATURE_KEY]: fromUserRecommendation.reducer,
};

export const initialState: ServiceDeskUiState = {
  [fromCategory.CATEGORY_FEATURE_KEY]: fromCategory.initialState,
  [fromService.SERVICE_FEATURE_KEY]: fromService.initialState,
  [fromTicket.TICKET_FEATURE_KEY]: fromTicket.initialState,
  [fromUserRecommendation.USER_RECOMMENDATION_FEATURE_KEY]: fromUserRecommendation.initialState,
};

export const getServiceDeskUiState = createFeatureSelector<ServiceDeskUiState>(SERVICE_DESK_SYSTEM_FEATURE_KEY);
