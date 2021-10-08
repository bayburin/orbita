import { EventTypeNames } from './event-type.interface';

export interface Event {
  /**
   * Номер тикета
   */
  claim_id: number;

  /**
   * Тип события
   */
  event_type: EventTypeNames;
}
