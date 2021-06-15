import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromOrbitaUi from './infrastructure/store/index';
import { AppEffects } from './infrastructure/store/app/app.effects';
import { SdRequestEffects } from './infrastructure/store/sd-request/sd-request.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromOrbitaUi.TICKET_SYSTEM_FEATURE_KEY, fromOrbitaUi.reducer, {
      metaReducers: fromOrbitaUi.metaReducers,
    }),
    EffectsModule.forFeature([AppEffects, SdRequestEffects]),
  ],
  providers: [],
})
export class OrbitaUiDomainLogicModule {}
