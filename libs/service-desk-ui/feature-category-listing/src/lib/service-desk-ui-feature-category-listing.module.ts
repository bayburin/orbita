import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ServiceDeskUiUiModule } from '@orbita/service-desk-ui/ui';
import { ServiceDeskUiDomainLogicModule } from '@orbita/service-desk-ui/domain-logic';

import { CategoryListingComponent } from './category-listing/category-listing.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CategoryListingComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ServiceDeskUiUiModule, ServiceDeskUiDomainLogicModule],
  declarations: [CategoryListingComponent],
})
export class ServiceDeskUiFeatureCategoryListingModule {}
