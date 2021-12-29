import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServiceDeskUiUiModule } from '@orbita/service-desk-ui/ui';
import { ServiceDeskUiDomainLogicModule } from '@orbita/service-desk-ui/domain-logic';

import { KaseListingComponent } from './kase-listing/kase-listing.component';

@NgModule({
  imports: [CommonModule, RouterModule, ServiceDeskUiUiModule, ServiceDeskUiDomainLogicModule],
  declarations: [KaseListingComponent],
  exports: [KaseListingComponent],
})
export class ServiceDeskUiFeatureKaseListingModule {}
