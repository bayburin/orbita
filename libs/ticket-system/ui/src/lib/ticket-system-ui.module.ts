import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimengModule } from './primeng.module';

import { DatetimePipe } from './pipes/datetime/datetime.pipe';
import { FioInitialsPipe } from './pipes/fio-initials/fio-initials.pipe';
import { FioMiddleNamePipe } from './pipes/fio-middle-name/fio-middle-name.pipe';

import { SdRequestsTableComponent } from './components/sd-requests-table/sd-requests-table.component';
import { SdRequestHistoryOverviewComponent } from './components/sd-request-history-overview/sd-request-history-overview.component';
import { HistoryEventCardComponent } from './components/history-event-card/history-event-card.component';
import { CommentsComponent } from './components/comments/comments.component';

const pipes: any[] = [
  DatetimePipe,
  FioInitialsPipe,
  FioMiddleNamePipe
];

const components: any[] = [
  SdRequestsTableComponent,
  SdRequestHistoryOverviewComponent,
  HistoryEventCardComponent,
  CommentsComponent
];

@NgModule({
  imports: [
    CommonModule,
    PrimengModule
  ],
  exports: [
    ...pipes,
    ...components,
    PrimengModule
  ],
  declarations: [
    ...pipes,
    ...components
  ]
})
export class TicketSystemUiModule {}
