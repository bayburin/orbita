import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ServiceDeskUiUiModule } from '@orbita/service-desk-ui/ui';
import { ServiceDeskUiDomainLogicModule } from '@orbita/service-desk-ui/domain-logic';

import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DashboardPageComponent,
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ServiceDeskUiUiModule, ServiceDeskUiDomainLogicModule],
  declarations: [DashboardPageComponent],
  exports: [DashboardPageComponent],
})
export class ServiceDeskUiFeatureDashboardModule {}
