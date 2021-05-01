import { Observable } from 'rxjs';

import { SdRequest } from './../../../entities/sd-request.interface';

/**
 * Содержит API заявок для обращения к серверу
 */
export abstract class SdRequestApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Получает с сервера список заявок.
   */
  abstract getSdRequests(): Observable<SdRequest[]>;
}
