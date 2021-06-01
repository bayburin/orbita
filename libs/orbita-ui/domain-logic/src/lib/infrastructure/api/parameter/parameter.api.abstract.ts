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
   * @param claim_id - номер заявки
   */
  abstract query(claim_id: number): Observable<ParameterServerData>;
}
