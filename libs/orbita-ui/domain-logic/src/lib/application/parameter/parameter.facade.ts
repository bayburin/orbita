import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ParameterFeature from '../../infrastructure/store/parameter/parameter.reducer';
import * as ParameterActions from '../../infrastructure/store/parameter/parameter.actions';
import * as ParameterSelectors from '../../infrastructure/store/parameter/parameter.selectors';
import { ParameterFacadeAbstract } from './parameter.facade.abstract';

/**
 * Фасад для работы с параметрами тикета (обращения к хранилищу Parameter)
 */
@Injectable({
  providedIn: 'root',
})
export class ParameterFacade implements ParameterFacadeAbstract {
  loading$ = this.store.select(ParameterSelectors.getLoading);
  loaded$ = this.store.select(ParameterSelectors.getLoaded);
  all$ = this.store.select(ParameterSelectors.getAll);

  constructor(private store: Store<ParameterFeature.ParameterPartialState>) {}
}
