import { Component, OnDestroy, OnInit } from '@angular/core';
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
  CsaStatuses,
  CsaStatusesViewModel,
  getViewModelCsaStatuses,
  ParameterFacade,
  Parameter,
} from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-overview-block',
  templateUrl: './overview-block.component.html',
  styleUrls: ['./overview-block.component.scss'],
})
export class OverviewBlockComponent implements OnInit, OnDestroy {
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
  loadingParameters$ = this.parameterFacade.loading$;
  loadedParameters$ = this.parameterFacade.loaded$;
  parameters$ = this.parameterFacade.all$;

  constructor(
    private sdRequestFacade: SdRequestFacade,
    private employeeFacade: EmployeeFacade,
    private svtFacade: SvtFacade,
    private acFacade: AuthCenterFacade,
    private parameterFacade: ParameterFacade
  ) {}

  ngOnInit(): void {
    this.sdRequestFacade.loadSelectedSdRequest();
  }

  ngOnDestroy(): void {
    this.sdRequestFacade.clearSelected();
  }

  trackByHistory(index: number, history: HistoryViewModel): number {
    return history.id;
  }

  trackByParameter(index: number, parameter: Parameter): number {
    return parameter.id;
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

  /**
   * Возвращает объект CmsStatusesViewModel, в котором содержатся данные о статусе антивируса
   *
   * @param status - статус
   */
  csaStatus(status: CsaStatuses): CsaStatusesViewModel {
    return getViewModelCsaStatuses(status);
  }
}
