import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import * as fromLayout from './infrastructure/store/layout.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromLayout.LAYOUT_FEATURE_KEY, fromLayout.reducer)
  ],
  providers: []
})
export class SharedDomainLogicModule {}
