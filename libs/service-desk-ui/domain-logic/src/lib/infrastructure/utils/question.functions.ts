import { QuestionOverviewVM } from './../../entities/view-models/question-overview-vm.interface';
import { User } from '../../entities/models/user.interface';

/**
 * Определяет, является ли пользователь ответственным за вопрос
 *
 * @param question - представление вопроса
 * @param user - пользователь
 */
export function isQuestionBelongsToUser(question: QuestionOverviewVM, user: User): boolean {
  return question.ticket.responsible_users.some((responsible) => responsible.tn === user.tn);
}

/**
 * Определяет, является ли пользователь ответственным услугу, к которой относится вопрос
 *
 * @param question - представление вопроса
 * @param user - пользователь
 */
export function isQuestionBelongsByServiceToUser(question: QuestionOverviewVM, user: User): boolean {
  return (
    question.ticket.service &&
    question.ticket.service.responsible_users.some((responsible) => responsible.tn === user.tn)
  );
}
