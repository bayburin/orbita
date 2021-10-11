import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'lib-detail-row',
  templateUrl: './detail-row.component.html',
  styleUrls: ['./detail-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailRowComponent {
  @Input() styleClassHeader: string;
  @Input() styleClassValue: string;
}
