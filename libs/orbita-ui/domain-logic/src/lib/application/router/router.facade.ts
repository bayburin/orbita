import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { RouterFacadeAbstract } from './router.facade.abstract';
import * as RouterSelectors from '../../infrastructure/store/selectors/router.selectors';

/**
 * Фасад для общей работы с маршрутизацией (обращения к хранилищу Router)
 */
@Injectable({
  providedIn: 'root',
})
export class RouterFacade implements RouterFacadeAbstract {
  breadcrumbMenu$ = this.store.select(RouterSelectors.breadcrumbDataSelector);

  constructor(private store: Store) {}
}
