import { Answer } from '../model/answer.interface';
import { AnswerVM } from './answer-vm.interface';
import { TicketOverviewVM } from './ticket-overview-vm.interface';

/**
 * Полное представление вопроса
 */
export interface QuestionOverviewVM {
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
  readonly ticket: TicketOverviewVM;

  /**
   * Черновой вариант вопроса
   */
  readonly correction?: QuestionOverviewVM;

  /**
   * Список ответов
   */
  readonly answers?: Answer[];
}
