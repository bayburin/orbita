import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CdkTableModule } from '@angular/cdk/table';

import { DatetimePipe } from './pipes/datetime.pipe';

import { SdRequestsTableComponent } from './components/sd-requests-table/sd-requests-table.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SdRequestViewComponent } from './components/sd-request-view/sd-request-view.component';
import { SdRequestHistoryOverviewComponent } from './components/sd-request-history-overview/sd-request-history-overview.component';
import { HistoryEventCardComponent } from './components/history-event-card/history-event-card.component';

const ngbModules: any[] = [
  NgbPaginationModule,
  NgbTooltipModule
];

const materialModules: any[] = [
  CdkTableModule
]

const pipes: any[] = [
  DatetimePipe
]

const components: any[] = [
  SdRequestsTableComponent,
  PaginationComponent,
  SdRequestViewComponent,
  SdRequestHistoryOverviewComponent,
  HistoryEventCardComponent,
]

@NgModule({
  imports: [
    CommonModule,
    ...ngbModules,
    ...materialModules
  ],
  exports: [
    ...ngbModules,
    ...materialModules,
    ...pipes,
    ...components
  ],
  declarations: [
    ...pipes,
    ...components
  ]
})
export class TicketSystemUiModule {}
