import { Observable } from 'rxjs';

import { FreeSdRequestType } from '../../../entities/models/sd/free-sd-request-type.interface';

export abstract class ServiceDeskApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Получает с сервера список видов заявок в свободной форме
   */
  abstract getFreeSdRequestTypes(): Observable<FreeSdRequestType[]>;
}
