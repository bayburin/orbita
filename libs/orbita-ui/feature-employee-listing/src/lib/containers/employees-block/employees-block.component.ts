import { Component } from '@angular/core';
import { EmployeeFacade } from '@orbita/orbita-ui/domain-logic';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'lib-employees-block',
  templateUrl: './employees-block.component.html',
  styleUrls: ['./employees-block.component.scss'],
})
export class EmployeesBlockComponent {
  employees$ = this.employeeFacade.allShort$;
  loadingEmployees$ = this.employeeFacade.loadingShort$;

  constructor(private employeeFacade: EmployeeFacade) {}

  /**
   * Событие изменения метаданных таблицы
   *
   * @param event - метаданные для загрузки данных таблицы
   */
  tableChanged(event: LazyLoadEvent): void {
    this.employeeFacade.search(event.filters);
  }
}
