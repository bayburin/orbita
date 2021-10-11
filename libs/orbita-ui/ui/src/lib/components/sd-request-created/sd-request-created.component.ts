import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { SdRequestViewModel } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-sd-request-created',
  templateUrl: './sd-request-created.component.html',
  styleUrls: ['./sd-request-created.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SdRequestCreatedComponent {
  /**
   * Данные о созданной заявке
   */
  @Input() sdRequest: SdRequestViewModel;
  /**
   * Флаг открытия модального окна
   */
  @Input() openModal: boolean;
  /**
   * Событие перехода к созданной заявке
   */
  @Output() backToCurrentSdRequest = new EventEmitter<number>();
  /**
   * Событие перехода к странице заявок
   */
  @Output() backToSdRequestList = new EventEmitter<void>();
  /**
   * Создать новую заявку
   */
  @Output() createAnotherSdRequest = new EventEmitter<void>();
}
