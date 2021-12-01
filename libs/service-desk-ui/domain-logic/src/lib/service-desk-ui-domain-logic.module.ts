import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCategory from './infrastructure/store/category/category.reducer';
import { CategoryEffects } from './infrastructure/store/category/category.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromCategory.CATEGORY_FEATURE_KEY, fromCategory.reducer),
    EffectsModule.forFeature([CategoryEffects]),
  ],
})
export class ServiceDeskUiDomainLogicModule {}
