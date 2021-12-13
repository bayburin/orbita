import { AnswerVM } from './answer-view-model.interface';
import { TicketVM } from './ticket-vm.interface';

/**
 * Представление вопроса
 */
export interface QuestionVM {
  /**
   * Идентификатор вопроса
   */
  readonly id: number;

  /**
   * Идентификатор оригинала (в случае, если это черновой вариант)
   */
  readonly original_id: number;

  /**
   * Тикет
   */
  readonly ticket: TicketVM;

  /**
   * Черновой вариант вопроса
   */
  readonly correction?: QuestionVM;

  /**
   * Список ответов
   */
  readonly answers?: AnswerVM[];
}
