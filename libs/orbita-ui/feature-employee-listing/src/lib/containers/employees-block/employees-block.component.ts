import { Component, OnDestroy } from '@angular/core';
import { EmployeeFacade } from '@orbita/orbita-ui/domain-logic';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'lib-employees-block',
  templateUrl: './employees-block.component.html',
  styleUrls: ['./employees-block.component.scss'],
})
export class EmployeesBlockComponent implements OnDestroy {
  employees$ = this.employeeFacade.allShort$;
  loadingEmployees$ = this.employeeFacade.loadingShort$;

  constructor(private employeeFacade: EmployeeFacade) {}

  ngOnDestroy(): void {
    this.employeeFacade.clearEmployeeShortEntities();
  }

  /**
   * Вызывает метод для поиска новых данных для таблицы
   *
   * @param event - метаданные для загрузки данных таблицы
   */
  changeTable(event: LazyLoadEvent): void {
    this.employeeFacade.search(event.filters);
  }

  /**
   * Очищает таблицу
   */
  clearTable(): void {
    this.employeeFacade.clearEmployeeShortEntities();
  }
}
