import { EventTypeNames } from './event-type-names.enum';

/**
 * Интерфейс видов событий, происходящих с заявкой
 */
export interface EventType {
  /**
   * Идентификатор вида события
   */
  readonly id: number;

  /**
   * Имя вида события
   */
  readonly name: EventTypeNames;

  /**
   * Описание вида события
   */
  readonly description: string;
}
