import { ServiceVM } from './../../entities/view-models/service-vm.interface';
import { User } from '../../entities/models/user.interface';
import { SearchResultTypes } from '../../entities/models/search-result.types';

/**
 * Определяет, является ли пользователь ответственным за услугу
 *
 * @param service - представление услуги
 * @param user - пользователь
 */
export function isServiceBelongsToUser(service: ServiceVM, user: User): boolean {
  return service.responsible_users.some((responsible) => responsible.tn === user.tn);
}

/**
 * Определяет, является ли пользователь ответственным за любой тикет в услуге
 *
 * @param service - представление услуги
 * @param user - пользователь
 */
export function isServiceBelongsByTicketToUser(service: ServiceVM, user: User): boolean {
  return service.questions.some((q) => q.ticket.responsible_users.some((responsible) => responsible.tn === user.tn));
}

/**
 * Проверяет, является ли объект услугой
 *
 * @param data - проверяемый объект
 */
export function isService(data: SearchResultTypes): data is ServiceVM {
  return (data as ServiceVM).category_id !== undefined;
}
