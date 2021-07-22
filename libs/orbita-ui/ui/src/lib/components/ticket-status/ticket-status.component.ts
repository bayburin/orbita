import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { getViewModelStatus, Statuses, StatusesViewModel } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-ticket-status',
  templateUrl: './ticket-status.component.html',
  styleUrls: ['./ticket-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketStatusComponent {
  @Input() status: Statuses;

  /**
   * Возвращает объект StatusesViewModel, в котором содержатся данные о статусе для представления
   */
  get statusVm(): StatusesViewModel {
    return getViewModelStatus(this.status);
  }
}
