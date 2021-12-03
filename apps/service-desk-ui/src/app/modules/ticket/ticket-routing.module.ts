import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResponsibleGuard } from '../../core/guards/responsible/responsible.guard';
import { DashboardPageComponent } from './pages/dashboard/dashboard.page';
import { CategoriesPageComponent } from './pages/categories/categories.page';
import { CategoriesOverviewPageComponent } from './pages/categories-overwiev/categories-overview.page';
import { SearchPageComponent } from './pages/search/search.page';
import { CategoriesDetailPageComponent } from './pages/categories-detail/categories-detail.page';
import { CategoryService } from '../../shared/services/category/category.service';
import { ServicesDetailPageComponent } from './pages/services-detail/services-detail.page';
import { ServiceService } from '../../shared/services/service/service.service';
import { MarkdownHelpPageComponent } from './pages/markdown-help/markdown-help.page';
import { ServiceRedirectionComponent } from './components/service-redirection/service-redirection.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
  },
  {
    path: 'categories',
    component: CategoriesPageComponent,
    data: { breadcrumb: 'Услуги' },
    children: [
      {
        path: '',
        component: CategoriesOverviewPageComponent,
      },
      {
        path: ':id',
        component: CategoriesDetailPageComponent,
        data: { breadcrumb: CategoryService },
      },
    ],
  },
  {
    path: 'services/:id',
    component: ServiceRedirectionComponent,
  },
  {
    path: 'categories/:id',
    component: CategoriesPageComponent,
    data: { breadcrumb: [CategoryService, ServiceService] },
    children: [
      {
        path: 'services/:id',
        component: ServicesDetailPageComponent,
        data: { breadcrumb: ServiceService },
        children: [
          {
            path: 'admin',
            loadChildren: () => import('./admin/admin-ticket.module').then((m) => m.AdminTicketModule),
            canLoad: [ResponsibleGuard],
          },
        ],
      },
    ],
  },
  // {
  //   path: 'services',
  //   component: ServicesOverwievPageComponent,
  //   canActivate: [AuthGuard],
  //   data: { breadcrumb: 'Все вопросы' }
  // },
  {
    path: 'search',
    component: SearchPageComponent,
    data: { breadcrumb: 'Поиск' },
  },
  {
    path: 'markdown-help',
    component: MarkdownHelpPageComponent,
    data: { breadcrumb: 'Справка по форматированию' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketRoutingModule {}
