import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-detail-row',
  templateUrl: './detail-row.component.html',
  styleUrls: ['./detail-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailRowComponent {}
