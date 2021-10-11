import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { LayoutEffects } from './infrastructure/store/layout.effect';
import * as fromLayout from './infrastructure/store/layout.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromLayout.LAYOUT_FEATURE_KEY, fromLayout.reducer, {
      metaReducers: [fromLayout.layoutMetaReducer],
    }),
    EffectsModule.forFeature([LayoutEffects]),
  ],
  providers: [],
})
export class SharedDomainLogicModule {}
