import { Observable } from 'rxjs';

import { Host } from './../../entities/models/host.interface';

export abstract class AuthCenterFacadeAbstract {
  /**
   * Индикатор загрузки оста
   */
  loadingHost$: Observable<boolean>;
  /**
   * Индикатор, загружены ли данные по хосту
   */
  loadedHost$: Observable<boolean>;
  /**
   * Выбранный хост
   */
  selectedHost$: Observable<Host>;
}
