import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { getViewModelPriority, Priorities, PrioritiesViewModel } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-ticket-priority',
  templateUrl: './ticket-priority.component.html',
  styleUrls: ['./ticket-priority.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketPriorityComponent {
  @Input() priority: Priorities;

  /**
   * Возвращает объект PrioritiesViewModel, в котором содержатся данные о приоритете для представления
   *
   * @param priority - приоритет
   */
  priorityVm(priority: Priorities): PrioritiesViewModel {
    return getViewModelPriority(priority);
  }
}
