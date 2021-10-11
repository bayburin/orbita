import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TicketLayoutPageComponent } from './pages/ticket-layout-page/ticket-layout-page.component';

const routes: Routes = [
  {
    path: '',
    component: TicketLayoutPageComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('@orbita/orbita-ui/feature-listing').then((m) => m.OrbitaUiFeatureListingModule),
      },
      {
        path: 'new-sd-request',
        loadChildren: () =>
          import('@orbita/orbita-ui/feature-sd-request-wizzard').then((m) => m.OrbitaUiFeatureSdRequestWizzardModule),
        data: { breadcrumb: 'Новая заявка' },
      },
      {
        path: 'sd-requests/:id',
        loadChildren: () =>
          import('@orbita/orbita-ui/feature-sd-request-overview').then((m) => m.OrbitaUiFeatureSdRequestOverviewModule),
        data: { breadcrumb: 'Просмотр заявки' },
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [TicketLayoutPageComponent],
})
export class OrbitaUiFeatureTicketModule {}
