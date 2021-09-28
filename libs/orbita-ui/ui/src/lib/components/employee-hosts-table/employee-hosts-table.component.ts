import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Host } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-employee-hosts-table',
  templateUrl: './employee-hosts-table.component.html',
  styleUrls: ['./employee-hosts-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeHostsTableComponent {
  /**
   * Массив хостов
   */
  @Input() hosts: Host[];
  /**
   * Индикатор загрузки
   */
  @Input() loading: boolean;
}
