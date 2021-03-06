import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedDomainLogicModule } from '@orbita/shared/domain-logic';
import { OrbitaUiUiModule } from '@orbita/orbita-ui/ui';

import { LayoutComponent } from './containers/layout/layout.component';
import { BreadcrumbComponent } from './containers/breadcrumb/breadcrumb.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tickets',
      },
      {
        path: 'tickets',
        loadChildren: () => import('@orbita/orbita-ui/feature-ticket').then((m) => m.OrbitaUiFeatureTicketModule),
        data: { breadcrumb: 'Тикеты' },
      },
      {
        path: 'employees',
        loadChildren: () => import('@orbita/orbita-ui/feature-employee').then((m) => m.OrbitaUiFeatureEmployeeModule),
        data: { breadcrumb: 'Работники' },
      },
      {
        path: 'svt-items',
        loadChildren: () => import('@orbita/orbita-ui/feature-svt-item').then((m) => m.OrbitaUiFeatureSvtItemModule),
        data: { breadcrumb: 'Выч. техника' },
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedDomainLogicModule, OrbitaUiUiModule],
  exports: [RouterModule],
  declarations: [LayoutComponent, BreadcrumbComponent],
})
export class OrbitaUiShellModule {}
