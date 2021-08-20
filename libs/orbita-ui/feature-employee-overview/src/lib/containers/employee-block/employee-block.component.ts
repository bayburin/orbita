import { LazyLoadEvent } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { EmployeeFacade, SdRequestFacade } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-employee-block',
  templateUrl: './employee-block.component.html',
  styleUrls: ['./employee-block.component.scss'],
})
export class EmployeeBlockComponent implements OnInit {
  // ========== Работник ==========

  employee$ = this.employeeFacade.employee$;
  employeeLoading$ = this.employeeFacade.loadingEmployee$;
  employeeLoaded$ = this.employeeFacade.loadedEmployee$;

  // ========== Заявки работника ==========

  sdRequests$ = this.sdRequestFacade.all$;
  loadingSdRequests$ = this.sdRequestFacade.loading$;
  totalCountSdRequests$ = this.sdRequestFacade.totalCount$;

  constructor(private employeeFacade: EmployeeFacade, private sdRequestFacade: SdRequestFacade) {}

  ngOnInit(): void {
    this.employeeFacade.overviewSingleEmployee();
  }

  /**
   * Событие изменения метаданных таблицы заявок
   *
   * @param event - метаданные для загрузки данных таблицы
   */
  tableChanged(event: LazyLoadEvent): void {
    this.sdRequestFacade.loadFiltered(event);
  }
}
