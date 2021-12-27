import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ServiceDeskUiUiModule } from '@orbita/service-desk-ui/ui';
import { ServiceDeskUiDomainLogicModule } from '@orbita/service-desk-ui/domain-logic';

import { ServiceOverviewComponent } from './service-overview/service-overview.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ServiceOverviewComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ServiceDeskUiUiModule, ServiceDeskUiDomainLogicModule],
  declarations: [ServiceOverviewComponent],
})
export class ServiceDeskUiFeatureServiceOverviewModule {}
