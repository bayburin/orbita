import { Cable } from 'angular2-actioncable';

/**
 * Сервис для работы с ActionCable
 */
export abstract class StreamServiceAbstract {
  /**
   * Объект, содержащий параметры соединения с сервером
   */
  cable: Cable;
}
