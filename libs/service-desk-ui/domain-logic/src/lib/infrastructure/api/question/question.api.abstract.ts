import { Observable } from 'rxjs';

export abstract class QuestionApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Повышает рейтинг популярности вопроса
   *
   * @param ticketId - ID тикета
   * @param serviceId - ID услуги
   */
  abstract upRating(ticketId: number, serviceId: number): Observable<void>;
}
