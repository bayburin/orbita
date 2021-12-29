import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BreadcrumbValueTypes, ServiceDeskUiDomainLogicModule } from '@orbita/service-desk-ui/domain-logic';
import { ServiceDeskUiUiModule } from '@orbita/service-desk-ui/ui';

import { LayoutComponent } from './containers/layout/layout.component';
import { NavbarComponent } from './containers/navbar/navbar.component';
import { BreadcrumbComponent } from './containers/breadcrumb/breadcrumb.component';
import { ServiceRedirectionResolver } from './resolvers/service-redirection.resolver';
import { TicketRedirectionResolver } from './resolvers/ticket-redirection.resolver';

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
        path: 'services/:id',
        resolve: { service: ServiceRedirectionResolver },
      },
      {
        path: 'tickets/:identity',
        resolve: { ticket: TicketRedirectionResolver },
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
        children: [
          {
            path: '',
            loadChildren: () =>
              import('@orbita/service-desk-ui/feature-all-kases').then((m) => m.ServiceDeskUiFeatureAllKasesModule),
            data: { breadcrumb: { type: BreadcrumbValueTypes.TEXT, value: 'Заявки' } },
          },
          {
            path: 'new',
            loadChildren: () =>
              import('@orbita/service-desk-ui/feature-new-kase').then((m) => m.ServiceDeskUiFeatureNewKaseModule),
            data: { breadcrumb: { type: BreadcrumbValueTypes.TEXT, value: 'Поддержка' } },
          },
        ],
      },
      {
        path: 'search-result',
        data: { breadcrumb: { type: BreadcrumbValueTypes.TEXT, value: 'Поиск' } },
        children: [
          {
            path: '',
            loadChildren: () =>
              import('@orbita/service-desk-ui/feature-search-result').then(
                (m) => m.ServiceDeskUiFeatureSearchResultModule
              ),
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
  imports: [CommonModule, RouterModule.forChild(routes), ServiceDeskUiDomainLogicModule, ServiceDeskUiUiModule],
  exports: [RouterModule],
  declarations: [LayoutComponent, NavbarComponent, BreadcrumbComponent],
})
export class ServiceDeskUiShellModule {}
