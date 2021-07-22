import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimengModule } from './primeng.module';

import { DatetimePipe } from './pipes/datetime/datetime.pipe';
import { FioInitialsPipe } from './pipes/fio-initials/fio-initials.pipe';
import { FioMiddleNamePipe } from './pipes/fio-middle-name/fio-middle-name.pipe';

import { OrbitSpinnerModule } from 'angular-epic-spinners';

import { DndFilesDirective } from './directives/dnd-files/dnd-files.directive';

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
import { WorkflowsComponent } from './components/workflows/workflows.component';
import { WorkflowComponent } from './components/workflow/workflow.component';
import { AttachmentsFormComponent } from './components/attachments-form/attachments-form.component';
import { AttachmentsLoadingComponent } from './components/attachments-loading/attachments-loading.component';
import { AttachmentsErrorComponent } from './components/attachments-error/attachments-error.component';
import { TicketPriorityComponent } from './components/ticket-priority/ticket-priority.component';
import { TicketStatusComponent } from './components/ticket-status/ticket-status.component';

const modules: any[] = [FormsModule, ReactiveFormsModule, OrbitSpinnerModule];

const pipes: any[] = [DatetimePipe, FioInitialsPipe, FioMiddleNamePipe];

const directives: any[] = [DndFilesDirective];

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
  SourceSnapshotComponent,
  WorkflowsComponent,
  WorkflowComponent,
  AttachmentsFormComponent,
  AttachmentsLoadingComponent,
  AttachmentsErrorComponent,
  TicketPriorityComponent,
  TicketStatusComponent,
];

@NgModule({
  imports: [CommonModule, PrimengModule, ...modules],
  exports: [...pipes, ...components, PrimengModule, ...modules, ...directives],
  declarations: [...pipes, ...components, ...directives],
})
export class OrbitaUiUiModule {}
