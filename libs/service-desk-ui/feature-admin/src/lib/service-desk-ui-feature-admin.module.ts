import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ServiceDeskUiUiModule } from '@orbita/service-desk-ui/ui';
import { BreadcrumbValueTypes, ServiceDeskUiDomainLogicModule } from '@orbita/service-desk-ui/domain-logic';

import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('@orbita/service-desk-ui/feature-admin-home').then((m) => m.ServiceDeskUiFeatureAdminHomeModule),
      },
      {
        path: 'services/:id',
        loadChildren: () =>
          import('@orbita/service-desk-ui/feature-admin-ticket-listing').then(
            (m) => m.ServiceDeskUiFeatureAdminTicketListingModule
          ),
        data: { breadcrumb: { type: BreadcrumbValueTypes.SERVICE_ID } },
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ServiceDeskUiUiModule, ServiceDeskUiDomainLogicModule],
  declarations: [AdminComponent],
})
export class ServiceDeskUiFeatureAdminModule {}
