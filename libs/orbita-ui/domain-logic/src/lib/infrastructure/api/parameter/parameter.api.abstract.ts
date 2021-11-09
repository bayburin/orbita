import { Observable } from 'rxjs';

import { ParameterServerData } from './../../../entities/server-data/parameter-server-data.interface';

/**
 * Содержит API параметров заявок для обращения к серверу
 */
export abstract class ParameterApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Получает с сервера список параметров заявки
   *
   * @param claimId - номер заявки
   */
  // abstract query(claimId: number): Observable<ParameterServerData>;
}
