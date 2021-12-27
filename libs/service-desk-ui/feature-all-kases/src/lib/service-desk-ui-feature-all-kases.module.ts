import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ServiceDeskUiUiModule } from '@orbita/service-desk-ui/ui';
import { ServiceDeskUiDomainLogicModule } from '@orbita/service-desk-ui/domain-logic';
import { ServiceDeskUiFeatureKaseListingModule } from '@orbita/service-desk-ui/feature-kase-listing';

import { AllKasesComponent } from './all-kases/all-kases.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AllKasesComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ServiceDeskUiUiModule,
    ServiceDeskUiDomainLogicModule,
    ServiceDeskUiFeatureKaseListingModule,
  ],
  declarations: [AllKasesComponent],
})
export class ServiceDeskUiFeatureAllKasesModule {}
