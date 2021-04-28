import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromSdRequest from './infrastructure/store/sd-request.reducer';
import { SdRequestEffects } from './infrastructure/store/sd-request.effects';
import { SdRequestFacade } from './application/sd-request.facade';
import { SdRequestApi } from './infrastructure/api/sd-request.api';

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
    SdRequestApi
  ],
})
export class SdRequestListingDomainLogicModule {}
