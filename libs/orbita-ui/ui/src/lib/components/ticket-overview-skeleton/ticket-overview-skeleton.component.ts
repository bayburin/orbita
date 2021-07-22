import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-ticket-overview-skeleton',
  templateUrl: './ticket-overview-skeleton.component.html',
  styleUrls: ['./ticket-overview-skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketOverviewSkeletonComponent {}
