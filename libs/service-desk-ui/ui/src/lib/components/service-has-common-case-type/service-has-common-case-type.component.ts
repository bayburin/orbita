import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { getServiceHasCommonCaseTypes, ServiceHasCommonCaseTypesVM } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-service-has-common-case-type',
  templateUrl: './service-has-common-case-type.component.html',
  styleUrls: ['./service-has-common-case-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServiceHasCommonCaseTypeComponent {
  @Input() hasCommonCase: boolean;

  /**
   * Возвращает объект-представление для типа ссылки указанной записи
   *
   * @param isHidden - тип услуги
   */
  serviceHasCommonCaseType(hasCommonCase: boolean): ServiceHasCommonCaseTypesVM {
    return getServiceHasCommonCaseTypes(hasCommonCase);
  }
}
