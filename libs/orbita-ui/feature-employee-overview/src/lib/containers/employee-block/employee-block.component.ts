import { filter, first } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeFacade, SdRequestFacade, SdRequestViewModel, SvtFacade } from '@orbita/orbita-ui/domain-logic';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-employee-block',
  templateUrl: './employee-block.component.html',
  styleUrls: ['./employee-block.component.scss'],
})
export class EmployeeBlockComponent implements OnInit, OnDestroy {
  skeleton = true;

  // ========== Работник ==========

  employee$ = this.employeeFacade.employee$;
  employeeLoading$ = this.employeeFacade.loadingEmployee$;
  employeeLoaded$ = this.employeeFacade.loadedEmployee$;

  // ========== Заявки работника ==========

  sdRequests$ = this.sdRequestFacade.all$;
  loadingSdRequests$ = this.sdRequestFacade.loading$;
  totalCountSdRequests$ = this.sdRequestFacade.totalCount$;

  // ========== ВТ работника ==========

  svtItems$ = this.svtFacade.allItems$;
  svtItemsLoading$ = this.svtFacade.loadingItem$;

  constructor(
    private employeeFacade: EmployeeFacade,
    private sdRequestFacade: SdRequestFacade,
    private svtFacade: SvtFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeFacade.overviewSingleEmployee();
    this.employeeLoaded$
      .pipe(
        filter((val) => val),
        first()
      )
      .subscribe(() => (this.skeleton = false));
  }

  ngOnDestroy(): void {
    this.employeeFacade.clearSelectedEmployee();
  }

  /**
   * Событие изменения метаданных таблицы заявок
   *
   * @param event - метаданные для загрузки данных таблицы
   */
  tableChanged(event: LazyLoadEvent): void {
    this.sdRequestFacade.loadFiltered(event);
  }

  /**
   * Переходит на страницу детального просмотра выбранной заявки
   *
   * @param sdRequest - выбранный работник
   */
  redirectToSdRequestPage(sdRequest: SdRequestViewModel) {
    this.router.navigate(['/tickets', 'sd-requests', sdRequest.id]);
  }
}
