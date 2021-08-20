import { Employee } from './../../../../../domain-logic/src/lib/entities/models/employee/employee.interface';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { SdRequestViewModel } from '@orbita/orbita-ui/domain-logic';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'lib-employee-sd-requests-table',
  templateUrl: './employee-sd-requests-table.component.html',
  styleUrls: ['./employee-sd-requests-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeSdRequestsTableComponent implements AfterViewInit {
  @ViewChild('table', { static: false }) table: Table;
  /**
   * Работник, чьи заявки должны выводиться
   */
  @Input() employee: Employee;
  /**
   * Массив заявок
   */
  @Input() sdRequests: SdRequestViewModel[];
  /**
   * Индикатор загрузки
   */
  @Input() loading: boolean;
  /**
   * Общее число записей
   */
  @Input() totalCount: number;
  /**
   * События изменения метаданных таблицы (пагинация, сортировка, фильтры)
   */
  @Output() tableChanged = new EventEmitter<LazyLoadEvent>();

  get sortedSdRequests(): SdRequestViewModel[] {
    return this.sdRequests.sort((a, b) => (a.id > b.id ? -1 : 1));
  }

  ngAfterViewInit(): void {
    this.table.filter(this.employee.id, 'employee_id_tn', 'equals');
  }

  /**
   * Событие изменения метаданных таблицы, требующее обновления данных таблицы
   *
   * @param event - метаданные для загрузки данных таблицы
   */
  onLazyLoad(event: LazyLoadEvent) {
    this.tableChanged.emit(event);
  }
}
