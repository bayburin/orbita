import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeFacade, EmployeeShort } from '@orbita/orbita-ui/domain-logic';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'lib-employees-block',
  templateUrl: './employees-block.component.html',
  styleUrls: ['./employees-block.component.scss'],
})
export class EmployeesBlockComponent implements OnDestroy {
  employees$ = this.employeeFacade.allShort$;
  loadingEmployees$ = this.employeeFacade.loadingShort$;

  constructor(private employeeFacade: EmployeeFacade, private router: Router, private route: ActivatedRoute) {}

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

  /**
   * Переходит на страницу детального просмотра выбранного работника
   *
   * @param employee - выбранный работник
   */
  redicrectToEmployeePage(employee: EmployeeShort) {
    this.router.navigate([employee.id], { relativeTo: this.route });
  }

  /**
   * Переходит на страницу создания заявки с выбранным работником
   *
   * @param employee - выбранный работник
   */
  redicrectToNewSdRequestPage(employee: EmployeeShort) {
    this.router.navigate(['/tickets', 'new-sd-request'], { queryParams: { id_tn: employee.id } });
  }
}
