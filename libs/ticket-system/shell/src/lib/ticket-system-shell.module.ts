import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SharedDomainLogicModule } from '@orbita/shared/domain-logic';
import { TicketSystemUiModule } from '@orbita/ticket-system/ui';
import { LayoutComponent } from './containers/layout/layout.component';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'tickets'
      },
      {
        path: 'tickets',
        loadChildren: () => import('@orbita/ticket-system/feature-listing').then(
          m => m.TicketSystemFeatureListingModule
        )
      },
      {
        path: 'new-sd-request',
        loadChildren: () => import('@orbita/ticket-system/feature-sd-request-wizzard').then(
          m => m.TicketSystemFeatureSdRequestWizzardModule
        )
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedDomainLogicModule,
    TicketSystemUiModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent
  ]
})
export class TicketSystemShellModule {}
