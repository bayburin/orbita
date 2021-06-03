import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedDomainLogicModule } from '@orbita/shared/domain-logic';
import { OrbitaUiUiModule } from '@orbita/orbita-ui/ui';
import { LayoutComponent } from './containers/layout/layout.component';

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
        loadChildren: () =>
          import('@orbita/orbita-ui/feature-listing').then(
            (m) => m.OrbitaUiFeatureListingModule
          ),
      },
      {
        path: 'tickets/new-sd-request',
        loadChildren: () =>
          import('@orbita/orbita-ui/feature-sd-request-wizzard').then(
            (m) => m.OrbitaUiFeatureSdRequestWizzardModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedDomainLogicModule,
    OrbitaUiUiModule,
  ],
  exports: [RouterModule],
  declarations: [LayoutComponent],
})
export class OrbitaUiShellModule {}
