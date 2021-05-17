import { Component, Input } from '@angular/core';
import { History } from '@orbita/ticket-system/domain-logic';
import { EventTypeNames, EventTypeNamesData, getEventTypeName } from '@orbita/ticket-system/domain-logic';

@Component({
  selector: 'lib-history-event-card',
  templateUrl: './history-event-card.component.html',
  styleUrls: ['./history-event-card.component.scss']
})
export class HistoryEventCardComponent {
  /**
   * История события
   */
  @Input() history: History;
  /**
   * Порядковый номер события
   */
  @Input() num: number;
  /**
   * Флаг, показывающий, является ли текущее событие последним для заявки
   */
  @Input() isLast = false;

  /**
   * Возвращает объект EventTypeNamesData, содержащий данные представления для имен видов событий
   *
   * @param type - вид события
   */
  eventTypeName(type: EventTypeNames): EventTypeNamesData {
    return getEventTypeName(type);
  }
}
