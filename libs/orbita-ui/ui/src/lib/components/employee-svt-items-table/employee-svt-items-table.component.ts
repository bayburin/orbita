import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SvtItem } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-employee-svt-items-table',
  templateUrl: './employee-svt-items-table.component.html',
  styleUrls: ['./employee-svt-items-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeSvtItemsTableComponent {
  /**
   * Массив ВТ
   */
  @Input() items: SvtItem[];
  /**
   * Индикатор загрузки
   */
  @Input() loading: boolean;
}
