import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromServiceDeskUi from './infrastructure/store/index';
import { CategoryEffects } from './infrastructure/store/category/category.effects';
import { ServiceEffects } from './infrastructure/store/service/service.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromServiceDeskUi.SERVICE_DESK_SYSTEM_FEATURE_KEY, fromServiceDeskUi.reducer, {
      initialState: fromServiceDeskUi.initialState,
    }),
    EffectsModule.forFeature([CategoryEffects, ServiceEffects]),
  ],
})
export class ServiceDeskUiDomainLogicModule {}
