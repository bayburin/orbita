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

const pipes: any[] = [DatetimePipe, FioInitialsPipe, FioMiddleNamePipe];

const components: any[] = [
  SdRequestsTableComponent,
  SdRequestHistoryOverviewComponent,
  HistoryEventCardComponent,
  CommentsComponent,
  NavbarComponent,
  ShowSdRequestComponent,
  CommentComponent,
];

const modules: any[] = [FormsModule, OrbitSpinnerModule];

@NgModule({
  imports: [CommonModule, PrimengModule, ...modules],
  exports: [...pipes, ...components, PrimengModule, ...modules],
  declarations: [...pipes, ...components, SdRequestDetailsComponent],
})
export class OrbitaUiUiModule {}
