import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TicketSystemUiModule } from '@orbita/ticket-system/ui';

import { TicketSystemDomainLogicModule } from '@orbita/ticket-system/domain-logic';
import { SdRequestsBlockComponent } from './containers/sd-requests-block/sd-requests-block.component';
import { TicketsPageComponent } from './pages/tickets-page/tickets-page.component';
import { SdRequestsTableComponent } from './components/sd-requests-table/sd-requests-table.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SdRequestViewComponent } from './components/sd-request-view/sd-request-view.component';
import { SdRequestHistoryOverviewComponent } from './components/sd-request-history-overview/sd-request-history-overview.component';
import { HistoryEventCardComponent } from './components/history-event-card/history-event-card.component';

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
    SdRequestViewComponent,
    SdRequestHistoryOverviewComponent,
    HistoryEventCardComponent,
  ],
  exports: [
    TicketsPageComponent,
  ]
})
export class TicketSystemFeatureListingModule {}
