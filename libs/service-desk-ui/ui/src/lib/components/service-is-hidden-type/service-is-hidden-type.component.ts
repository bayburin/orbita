import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ServiceHiddenTypesVM, getServiceHiddenTypes } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-service-is-hidden-type',
  templateUrl: './service-is-hidden-type.component.html',
  styleUrls: ['./service-is-hidden-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceIsHiddenTypeComponent {
  @Input() isHidden: boolean;

  /**
   * Возвращает объект-представление для типа ссылки указанной записи
   *
   * @param isHidden - тип услуги
   */
  serviceHiddenType(isHidden: boolean): ServiceHiddenTypesVM {
    return getServiceHiddenTypes(isHidden);
  }
}
