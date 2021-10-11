import { Parameter } from '../models/parameter.interface';

/**
 * Описывает ответ с сервера по запросу параметров заявки
 */
export interface ParameterServerData {
  /**
   * Массив параметров заявки
   */
  parameters: Parameter[];
}
