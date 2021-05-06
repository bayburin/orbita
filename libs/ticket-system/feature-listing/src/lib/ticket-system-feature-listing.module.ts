import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TicketSystemUiModule } from '@orbita/ticket-system/ui';

import { TicketSystemDomainLogicModule } from '@orbita/ticket-system/domain-logic';
import { SdRequestsTableComponent } from './containers/sd-requests-table/sd-requests-table.component';
import { TicketsPageComponent } from './pages/tickets-page/tickets-page.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TicketsPageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TicketSystemUiModule,
    TicketSystemDomainLogicModule
  ],
  declarations: [
    SdRequestsTableComponent,
    TicketsPageComponent,
  ],
  exports: [
    SdRequestsTableComponent,
    TicketsPageComponent,
  ]
})
export class TicketSystemFeatureListingModule {}
