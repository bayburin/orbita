import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromOrbitaUi from './infrastructure/store/index';
import { AppEffects } from './infrastructure/store/app/app.effects';
import { SdRequestEffects } from './infrastructure/store/sd-request/sd-request.effects';
import { EmployeeEffects } from './infrastructure/store/employee/employee.effects';
import { SvtItemEffects } from './infrastructure/store/svt-item/svt-item.effects';
import { HostEffects } from './infrastructure/store/host/host.effects';
// import { ParameterEffects } from './infrastructure/store/parameter/parameter.effects';
import { AttachmentEffects } from './infrastructure/store/attachment/attachment.effects';
import { MessageEffects } from './infrastructure/store/message/message.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromOrbitaUi.TICKET_SYSTEM_FEATURE_KEY, fromOrbitaUi.reducer, {
      initialState: fromOrbitaUi.initialState,
      metaReducers: fromOrbitaUi.metaReducers,
    }),
    EffectsModule.forFeature([
      AppEffects,
      SdRequestEffects,
      EmployeeEffects,
      SvtItemEffects,
      HostEffects,
      // ParameterEffects,
      AttachmentEffects,
      MessageEffects,
    ]),
  ],
  providers: [],
})
export class OrbitaUiDomainLogicModule {}
