import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromHome from './home/home.reducer';
import * as fromCategory from './category/category.reducer';
import * as fromService from './service/service.reducer';
import * as fromTicket from './ticket/ticket.reducer';
import * as fromQuestion from './question/question.reducer';
import * as fromUserRecommendation from './user-recommendation/user-recommendation.reducer';
import * as fromSearch from './search/search.reducer';
import * as fromNotification from './notification/notification.reducer';
import * as fromResponsibleUser from './responsible-user/responsible-user.reducer';
import * as fromAnswer from './answer/answer.reducer';
import * as fromAttachment from './attachment/attachment.reducer';
import * as fromTag from './tag/tag.reducer';
import * as fromKase from './kase/kase.reducer';

export interface ServiceDeskUiState
  extends fromHome.HomePartialState,
    fromUserRecommendation.UserRecommendationPartialState,
    fromSearch.SearchPartialState,
    fromCategory.CategoryPartialState,
    fromService.ServicePartialState,
    fromTicket.TicketPartialState,
    fromQuestion.QuestionPartialState,
    fromAnswer.AnswerPartialState,
    fromAttachment.AttachmentPartialState,
    fromNotification.NotificationPartialState,
    fromResponsibleUser.ResponsibleUserPartialState,
    fromTag.TagPartialState,
    fromKase.KasePartialState {}

export const SERVICE_DESK_SYSTEM_FEATURE_KEY = 'serviceDeskUi';

export const reducer: ActionReducerMap<ServiceDeskUiState> = {
  [fromHome.HOME_FEATURE_KEY]: fromHome.reducer,
  [fromUserRecommendation.USER_RECOMMENDATION_FEATURE_KEY]: fromUserRecommendation.reducer,
  [fromSearch.SEARCH_FEATURE_KEY]: fromSearch.reducer,
  [fromCategory.CATEGORY_FEATURE_KEY]: fromCategory.reducer,
  [fromService.SERVICE_FEATURE_KEY]: fromService.reducer,
  [fromTicket.TICKET_FEATURE_KEY]: fromTicket.reducer,
  [fromQuestion.QUESTION_FEATURE_KEY]: fromQuestion.reducer,
  [fromAnswer.ANSWER_FEATURE_KEY]: fromAnswer.reducer,
  [fromAttachment.ATTACHMENT_FEATURE_KEY]: fromAttachment.reducer,
  [fromNotification.NOTIFICATION_FEATURE_KEY]: fromNotification.reducer,
  [fromResponsibleUser.RESPONSIBLE_USER_FEATURE_KEY]: fromResponsibleUser.reducer,
  [fromTag.TAG_FEATURE_KEY]: fromTag.reducer,
  [fromKase.KASE_FEATURE_KEY]: fromKase.reducer,
};

export const initialState: ServiceDeskUiState = {
  [fromHome.HOME_FEATURE_KEY]: fromHome.initialState,
  [fromUserRecommendation.USER_RECOMMENDATION_FEATURE_KEY]: fromUserRecommendation.initialState,
  [fromSearch.SEARCH_FEATURE_KEY]: fromSearch.initialState,
  [fromCategory.CATEGORY_FEATURE_KEY]: fromCategory.initialState,
  [fromService.SERVICE_FEATURE_KEY]: fromService.initialState,
  [fromTicket.TICKET_FEATURE_KEY]: fromTicket.initialState,
  [fromQuestion.QUESTION_FEATURE_KEY]: fromQuestion.initialState,
  [fromAnswer.ANSWER_FEATURE_KEY]: fromAnswer.initialState,
  [fromAttachment.ATTACHMENT_FEATURE_KEY]: fromAttachment.initialState,
  [fromNotification.NOTIFICATION_FEATURE_KEY]: fromNotification.initialState,
  [fromResponsibleUser.RESPONSIBLE_USER_FEATURE_KEY]: fromResponsibleUser.initialState,
  [fromTag.TAG_FEATURE_KEY]: fromTag.initialState,
  [fromKase.KASE_FEATURE_KEY]: fromKase.initialState,
};

export const getServiceDeskUiState = createFeatureSelector<ServiceDeskUiState>(SERVICE_DESK_SYSTEM_FEATURE_KEY);
