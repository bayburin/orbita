import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromTicketSystem from './infrastructure/store/index';
import { SdRequestEffects } from './infrastructure/store/sd-request/sd-request.effects';
import { FreeSdRequestTypeEffects } from './infrastructure/store/free-sd-request-type/free-sd-request-type.effects';
import { UserEffects } from './infrastructure/store/user/user.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromTicketSystem.TICKET_SYSTEM_FEATURE_KEY,
      fromTicketSystem.reducer
    ),
    EffectsModule.forFeature([
      SdRequestEffects,
      FreeSdRequestTypeEffects,
      UserEffects
    ])
  ],
  providers: [],
})
export class TicketSystemDomainLogicModule {}
