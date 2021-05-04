import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FreeSdRequestTypeEffects } from './infrastructure/store/free-sd-request-type/free-sd-request-type.effects';
import { SdRequestEffects } from './infrastructure/store/sd-request/sd-request.effects';
import * as fromTicketSystem from './infrastructure/store/index';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromTicketSystem.TICKET_SYSTEM_FEATURE_KEY,
      fromTicketSystem.reducer
    ),
    EffectsModule.forFeature([SdRequestEffects, FreeSdRequestTypeEffects])
  ],
  providers: [],
})
export class TicketSystemDomainLogicModule { }
