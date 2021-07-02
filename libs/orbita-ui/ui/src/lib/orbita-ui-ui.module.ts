import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PrimengModule } from './primeng.module';

import { DatetimePipe } from './pipes/datetime/datetime.pipe';
import { FioInitialsPipe } from './pipes/fio-initials/fio-initials.pipe';
import { FioMiddleNamePipe } from './pipes/fio-middle-name/fio-middle-name.pipe';

import { OrbitSpinnerModule } from 'angular-epic-spinners';

import { SdRequestsTableComponent } from './components/sd-requests-table/sd-requests-table.component';
import { SdRequestHistoryOverviewComponent } from './components/sd-request-history-overview/sd-request-history-overview.component';
import { HistoryEventCardComponent } from './components/history-event-card/history-event-card.component';
import { CommentsComponent } from './components/comments/comments.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ShowSdRequestComponent } from './components/show-sd-request/show-sd-request.component';
import { SdRequestDetailsComponent } from './components/sd-request-details/sd-request-details.component';
import { CommentComponent } from './components/comment/comment.component';
import { TicketOverviewSkeletonComponent } from './components/ticket-overview-skeleton/ticket-overview-skeleton.component';
import { PageErrorComponent } from './components/page-error/page-error.component';
import { PanelPlaceholderComponent } from './components/panel-placeholder/panel-placeholder.component';
import { DetailRowComponent } from './components/detail-row/detail-row.component';
import { SourceSnapshotComponent } from './components/source-snapshot/source-snapshot.component';
import { GroupHeaderComponent } from './components/group-header/group-header.component';

const pipes: any[] = [DatetimePipe, FioInitialsPipe, FioMiddleNamePipe];

const components: any[] = [
  SdRequestsTableComponent,
  SdRequestHistoryOverviewComponent,
  HistoryEventCardComponent,
  CommentsComponent,
  NavbarComponent,
  ShowSdRequestComponent,
  CommentComponent,
  SdRequestDetailsComponent,
  TicketOverviewSkeletonComponent,
  PageErrorComponent,
  PanelPlaceholderComponent,
  DetailRowComponent,
  GroupHeaderComponent,
];

const modules: any[] = [FormsModule, OrbitSpinnerModule];

@NgModule({
  imports: [CommonModule, PrimengModule, ...modules],
  exports: [...pipes, ...components, PrimengModule, ...modules, SourceSnapshotComponent],
  declarations: [...pipes, ...components, SourceSnapshotComponent],
})
export class OrbitaUiUiModule {}
