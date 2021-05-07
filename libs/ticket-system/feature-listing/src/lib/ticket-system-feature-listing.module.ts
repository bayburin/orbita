import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TicketSystemUiModule } from '@orbita/ticket-system/ui';

import { TicketSystemDomainLogicModule } from '@orbita/ticket-system/domain-logic';
import { SdRequestsBlockComponent } from './containers/sd-requests-block/sd-requests-block.component';
import { TicketsPageComponent } from './pages/tickets-page/tickets-page.component';
import { SdRequestsTableComponent } from './components/sd-requests-table/sd-requests-table.component';
import { PaginationComponent } from './components/pagination/pagination.component';

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
    SdRequestsBlockComponent,
    PaginationComponent,
  ],
  exports: [
    TicketsPageComponent,
  ]
})
export class TicketSystemFeatureListingModule {}
