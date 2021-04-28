import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' })
  ]
})
export class TicketSystemShellModule {}
