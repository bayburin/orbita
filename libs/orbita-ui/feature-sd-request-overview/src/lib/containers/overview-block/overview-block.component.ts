import { Component, OnInit } from '@angular/core';
import {
  SdRequestFacade,
  HistoryViewModel,
  Statuses,
  StatusesViewModel,
  getViewModelStatus,
  Priorities,
  PrioritiesViewModel,
  getViewModelPriority,
  EmployeeFacade,
  SvtFacade,
  AuthCenterFacade,
  CmsStatuses,
  CmsStatusesViewModel,
  getViewModelCmsStatuses,
} from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-overview-block',
  templateUrl: './overview-block.component.html',
  styleUrls: ['./overview-block.component.scss'],
})
export class OverviewBlockComponent implements OnInit {
  sdRequest$ = this.sdRequestFacade.selected$;
  loading$ = this.sdRequestFacade.loading$;
  error$ = this.sdRequestFacade.error$;
  orderedHistories$ = this.sdRequestFacade.orderedHistories$;
  loadingEmployee$ = this.employeeFacade.loadingEmployee$;
  loadedEmployee$ = this.employeeFacade.loadedEmployee$;
  employee$ = this.employeeFacade.employee$;
  loadingSvtItem$ = this.svtFacade.loadingItem$;
  loadedSvtItem$ = this.svtFacade.loadedItem$;
  svtItem$ = this.svtFacade.selectedItem$;
  loadingHost$ = this.acFacade.loadingHost$;
  loadedHost$ = this.acFacade.loadedHost$;
  host$ = this.acFacade.selectedHost$;

  constructor(
    private sdRequestFacade: SdRequestFacade,
    private employeeFacade: EmployeeFacade,
    private svtFacade: SvtFacade,
    private acFacade: AuthCenterFacade
  ) {}

  ngOnInit(): void {
    this.sdRequestFacade.loadSelectedSdRequest();
  }

  trackByHistory(index: number, history: HistoryViewModel): number {
    return history.id;
  }

  /**
   * Возвращает объект StatusesViewModel, в котором содержатся данные о статусе для представления
   *
   * @param status - статус
   */
  status(status: Statuses): StatusesViewModel {
    return getViewModelStatus(status);
  }

  /**
   * Возвращает объект PrioritiesViewModel, в котором содержатся данные о приоритете для представления
   *
   * @param priority - приоритет
   */
  priority(priority: Priorities): PrioritiesViewModel {
    return getViewModelPriority(priority);
  }

  /**
   * Возвращает объект CmsStatusesViewModel, в котором содержатся данные о статусе программы Аудит
   *
   * @param status - статус
   */
  cmsStatus(status: CmsStatuses): CmsStatusesViewModel {
    return getViewModelCmsStatuses(status);
  }
}
