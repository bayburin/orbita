import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ServiceOverviewVM,
  serviceHiddenVMArray,
  serviceHasCommonCaseVMArray,
  Category,
} from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-admin-services-table',
  templateUrl: './admin-services-table.component.html',
  styleUrls: ['./admin-services-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminServicesTableComponent {
  isHiddenValues = serviceHiddenVMArray;
  hasCommonCaseValues = serviceHasCommonCaseVMArray;
  /**
   * Список категорий
   */
  @Input() categories: Category[];
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
}
