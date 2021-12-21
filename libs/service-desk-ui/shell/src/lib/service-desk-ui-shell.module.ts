import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ServiceDeskUiUiModule } from '@orbita/service-desk-ui/ui';
import { LayoutComponent } from './containers/layout/layout.component';
import { NavbarComponent } from './containers/navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('@orbita/service-desk-ui/feature-home').then((m) => m.ServiceDeskUiFeatureHomeModule),
      },
      {
        path: 'categories',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('@orbita/service-desk-ui/feature-category-listing').then(
                (m) => m.ServiceDeskUiFeatureCategoryListingModule
              ),
          },
          {
            path: ':id',
            loadChildren: () =>
              import('@orbita/service-desk-ui/feature-category-overview').then(
                (m) => m.ServiceDeskUiFeatureCategoryOverviewModule
              ),
          },
        ],
      },
      {
        path: 'claims',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('@orbita/service-desk-ui/feature-kase-listing').then(
                (m) => m.ServiceDeskUiFeatureKaseListingModule
              ),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ServiceDeskUiUiModule],
  exports: [RouterModule],
  declarations: [LayoutComponent, NavbarComponent],
})
export class ServiceDeskUiShellModule {}
