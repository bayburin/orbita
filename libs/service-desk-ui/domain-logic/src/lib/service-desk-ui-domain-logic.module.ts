import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromServiceDeskUi from './infrastructure/store/index';
import { AppEffects } from './infrastructure/store/app/app.effects';
import { HomeEffects } from './infrastructure/store/home/home.effects';
import { CategoryEffects } from './infrastructure/store/category/category.effects';
import { ServiceEffects } from './infrastructure/store/service/service.effects';
import { UserRecommendationEffects } from './infrastructure/store/user-recommendation/user-recommendation.effects';
import { SearchEffects } from './infrastructure/store/search/search.effects';
import { NotificationEffects } from './infrastructure/store/notification/notification.effects';
import { KaseEffects } from './infrastructure/store/kase/kase.effects';
import { QuestionEffects } from './infrastructure/store/question/question.effects';
import { AttachmentEffects } from './infrastructure/store/attachment/attachment.effects';
import { DeepSearchEffects } from './infrastructure/store/deep-search/deep-search.effects';
import { TicketEffects } from './infrastructure/store/ticket/ticket.effects';
import { ResponsibleUserEffects } from './infrastructure/store/responsible-user/responsible-user.effects';
import { EmployeeEffects } from './infrastructure/store/employee/employee.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromServiceDeskUi.SERVICE_DESK_SYSTEM_FEATURE_KEY, fromServiceDeskUi.reducer, {
      initialState: fromServiceDeskUi.initialState,
    }),
    EffectsModule.forFeature([
      AppEffects,
      HomeEffects,
      CategoryEffects,
      ServiceEffects,
      UserRecommendationEffects,
      SearchEffects,
      NotificationEffects,
      KaseEffects,
      QuestionEffects,
      AttachmentEffects,
      DeepSearchEffects,
      TicketEffects,
      ResponsibleUserEffects,
      EmployeeEffects,
    ]),
  ],
})
export class ServiceDeskUiDomainLogicModule {}
