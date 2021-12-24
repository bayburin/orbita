import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ServiceDeskUiUiModule } from '@orbita/service-desk-ui/ui';
import { ServiceDeskUiDomainLogicModule } from '@orbita/service-desk-ui/domain-logic';

import { KaseListingComponent } from './kase-listing/kase-listing.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: KaseListingComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ServiceDeskUiUiModule, ServiceDeskUiDomainLogicModule],
  declarations: [KaseListingComponent],
  exports: [KaseListingComponent],
})
export class ServiceDeskUiFeatureKaseListingModule {}
