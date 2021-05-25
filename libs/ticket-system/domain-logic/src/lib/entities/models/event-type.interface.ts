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

/**
 * Виды событий
 */
 export enum EventTypeNames {
  OPEN = 'open',
  WORKFLOW = 'workflow',
  ADD_WORKERS = 'add_workers',
  DEL_WORKERS = 'del_workers',
  ESCALATION = 'escalation',
  POSTPONE = 'postpone',
  CLOSE = 'close',
  ADD_FILES = 'add_files',
  DEL_FILES = 'del_files',
  ADD_TAGS = 'add_tags',
  PRIORITY = 'priority'
}
