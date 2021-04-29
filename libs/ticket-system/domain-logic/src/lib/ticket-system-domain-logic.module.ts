import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import * as fromSdRequest from './infrastructure/store/sd-request.reducer';
import { SdRequestEffects } from './infrastructure/store/sd-request.effects';
import { SdRequestFacade } from './application/sd-request.facade';
import { SdRequestApi } from './infrastructure/api/sd-request.api';
import { JsonInterceptor } from './infrastructure/interceptors/json.interceptor';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromSdRequest.SD_REQUEST_FEATURE_KEY,
      fromSdRequest.reducer
    ),
    EffectsModule.forFeature([SdRequestEffects]),
  ],
  providers: [
    SdRequestFacade,
    SdRequestApi,
    { provide: HTTP_INTERCEPTORS, useClass: JsonInterceptor, multi: true }
  ]
})
export class TicketSystemDomainLogicModule {}
