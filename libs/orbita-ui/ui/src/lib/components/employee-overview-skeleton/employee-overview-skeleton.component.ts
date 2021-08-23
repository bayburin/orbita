import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-employee-overview-skeleton',
  templateUrl: './employee-overview-skeleton.component.html',
  styleUrls: ['./employee-overview-skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeOverviewSkeletonComponent {}
