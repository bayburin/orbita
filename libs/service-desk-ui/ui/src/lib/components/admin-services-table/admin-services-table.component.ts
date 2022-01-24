import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {
  getServiceHiddenTypes,
  ServiceOverviewVM,
  ServiceHiddenTypesVM,
  getServiceHasCommonCaseTypes,
  ServiceHasCommonCaseTypesVM,
} from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-admin-services-table',
  templateUrl: './admin-services-table.component.html',
  styleUrls: ['./admin-services-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminServicesTableComponent {
  /**
   * Список услуг
   */
  @Input() services: ServiceOverviewVM[];
  /**
   * Список идентификаторов услуг, которые сейчас обрабатываются (грузятся)
   */
  @Input() loadingIds: number[];
  /**
   * Событие открытия формы редактирования записи
   */
  @Output() editForm = new EventEmitter<ServiceOverviewVM>();
  /**
   * Событие удаления записи
   */
  @Output() remove = new EventEmitter<ServiceOverviewVM>();

  /**
   * Возвращает объект-представление для типа ссылки указанной записи
   *
   * @param isHidden - тип услуги
   */
  serviceHiddenType(isHidden: boolean): ServiceHiddenTypesVM {
    return getServiceHiddenTypes(isHidden);
  }

  /**
   * Возвращает объект-представление для типа ссылки указанной записи
   *
   * @param isHidden - тип услуги
   */
  serviceHasCommonCaseType(hasCommonCase: boolean): ServiceHasCommonCaseTypesVM {
    return getServiceHasCommonCaseTypes(hasCommonCase);
  }
}
