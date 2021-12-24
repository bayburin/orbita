import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BreadcrumbValueTypes } from '@orbita/service-desk-ui/domain-logic';
import { ServiceDeskUiUiModule } from '@orbita/service-desk-ui/ui';
import { LayoutComponent } from './containers/layout/layout.component';
import { NavbarComponent } from './containers/navbar/navbar.component';
import { BreadcrumbComponent } from './containers/breadcrumb/breadcrumb.component';

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
        data: { breadcrumb: { type: BreadcrumbValueTypes.TEXT, value: 'Главная' } },
      },
      {
        path: 'categories',
        data: { breadcrumb: { type: BreadcrumbValueTypes.TEXT, value: 'Услуги' } },
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
            data: { breadcrumb: { type: BreadcrumbValueTypes.CATEGORY_ID } },
          },
        ],
      },
      {
        path: 'categories/:id',
        data: { breadcrumb: { type: BreadcrumbValueTypes.CATEGORY_ID } },
        children: [
          {
            path: 'services/:id',
            loadChildren: () =>
              import('@orbita/service-desk-ui/feature-service-overview').then(
                (m) => m.ServiceDeskUiFeatureServiceOverviewModule
              ),
            data: { breadcrumb: { type: BreadcrumbValueTypes.SERVICE_ID } },
          },
        ],
      },
      {
        path: 'claims',
        data: { breadcrumb: { type: BreadcrumbValueTypes.TEXT, value: 'Заявки' } },
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
      {
        path: 'search',
        data: { breadcrumb: { type: BreadcrumbValueTypes.TEXT, value: 'Поиск' } },
        children: [
          {
            path: '',
            loadChildren: () =>
              import('@orbita/service-desk-ui/feature-search').then((m) => m.ServiceDeskUiFeatureSearchModule),
          },
        ],
      },
      {
        path: 'markdown-help',
        loadChildren: () =>
          import('@orbita/service-desk-ui/feature-markdown-help').then((m) => m.ServiceDeskUiFeatureMarkdownHelpModule),
        data: { breadcrumb: { type: BreadcrumbValueTypes.TEXT, value: 'Справка по форматированию' } },
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ServiceDeskUiUiModule],
  exports: [RouterModule],
  declarations: [LayoutComponent, NavbarComponent, BreadcrumbComponent],
})
export class ServiceDeskUiShellModule {}
