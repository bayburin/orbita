import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromServiceDeskUi from './infrastructure/store/index';
import { DashboardEffects } from './infrastructure/store/dashboard/dashboard.effects';
import { CategoryEffects } from './infrastructure/store/category/category.effects';
import { ServiceEffects } from './infrastructure/store/service/service.effects';
import { UserRecommendationEffects } from './infrastructure/store/user-recommendation/user-recommendation.effects';
import { SearchEffects } from './infrastructure/store/search/search.effects';
import { NotificationEffects } from './infrastructure/store/notification/notification.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromServiceDeskUi.SERVICE_DESK_SYSTEM_FEATURE_KEY, fromServiceDeskUi.reducer, {
      initialState: fromServiceDeskUi.initialState,
    }),
    EffectsModule.forFeature([
      DashboardEffects,
      CategoryEffects,
      ServiceEffects,
      UserRecommendationEffects,
      SearchEffects,
      NotificationEffects,
    ]),
  ],
})
export class ServiceDeskUiDomainLogicModule {}
