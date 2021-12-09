import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromDashboard from './dashboard/dashboard.reducer';
import * as fromCategory from './category/category.reducer';
import * as fromService from './service/service.reducer';
import * as fromTicket from './ticket/ticket.reducer';
import * as fromQuestion from './question/question.reducer';
import * as fromUserRecommendation from './user-recommendation/user-recommendation.reducer';
import * as fromSearch from './search/search.reducer';
import * as fromNotification from './notification/notification.reducer';

export interface ServiceDeskUiState
  extends fromDashboard.DashboardPartialState,
    fromCategory.CategoryPartialState,
    fromService.ServicePartialState,
    fromTicket.TicketPartialState,
    fromQuestion.QuestionPartialState,
    fromUserRecommendation.UserRecommendationPartialState,
    fromSearch.SearchPartialState,
    fromNotification.NotificationPartialState {}

export const SERVICE_DESK_SYSTEM_FEATURE_KEY = 'serviceDeskUi';

export const reducer: ActionReducerMap<ServiceDeskUiState> = {
  [fromDashboard.DASHBOARD_FEATURE_KEY]: fromDashboard.reducer,
  [fromCategory.CATEGORY_FEATURE_KEY]: fromCategory.reducer,
  [fromService.SERVICE_FEATURE_KEY]: fromService.reducer,
  [fromTicket.TICKET_FEATURE_KEY]: fromTicket.reducer,
  [fromQuestion.QUESTION_FEATURE_KEY]: fromQuestion.reducer,
  [fromUserRecommendation.USER_RECOMMENDATION_FEATURE_KEY]: fromUserRecommendation.reducer,
  [fromSearch.SEARCH_FEATURE_KEY]: fromSearch.reducer,
  [fromNotification.NOTIFICATION_FEATURE_KEY]: fromNotification.reducer,
};

export const initialState: ServiceDeskUiState = {
  [fromDashboard.DASHBOARD_FEATURE_KEY]: fromDashboard.initialState,
  [fromCategory.CATEGORY_FEATURE_KEY]: fromCategory.initialState,
  [fromService.SERVICE_FEATURE_KEY]: fromService.initialState,
  [fromTicket.TICKET_FEATURE_KEY]: fromTicket.initialState,
  [fromQuestion.QUESTION_FEATURE_KEY]: fromQuestion.initialState,
  [fromUserRecommendation.USER_RECOMMENDATION_FEATURE_KEY]: fromUserRecommendation.initialState,
  [fromSearch.SEARCH_FEATURE_KEY]: fromSearch.initialState,
  [fromNotification.NOTIFICATION_FEATURE_KEY]: fromNotification.initialState,
};

export const getServiceDeskUiState = createFeatureSelector<ServiceDeskUiState>(SERVICE_DESK_SYSTEM_FEATURE_KEY);
