import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { SdRequestFacade } from './application/sd-request.facade';
import { JsonInterceptor } from './infrastructure/interceptors/json.interceptor';
import { FreeSdRequestTypeEffects } from './infrastructure/store/free-sd-request-type/free-sd-request-type.effects';
import { SdRequestEffects } from './infrastructure/store/sd-request/sd-request.effects';
import * as fromTicketSystem from './infrastructure/store/index';
import { ServiceDeskApi } from './infrastructure/api/service-desk/service-desk.api';
import { SdRequestApi } from './infrastructure/api/sd-request/sd-request.api';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromTicketSystem.TICKET_SYSTEM_FEATURE_KEY,
      fromTicketSystem.reducer
    ),
    EffectsModule.forFeature([SdRequestEffects, FreeSdRequestTypeEffects])
  ],
  providers: [
    SdRequestFacade,
    SdRequestApi,
    ServiceDeskApi,
    { provide: HTTP_INTERCEPTORS, useClass: JsonInterceptor, multi: true },
  ],
})
export class TicketSystemDomainLogicModule {}
