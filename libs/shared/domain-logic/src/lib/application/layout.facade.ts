import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { LayoutFacadeAbstract } from './layout.facade.abstract';
import * as LayoutActions from '../infrastructure/store/layout.actions';
import * as LayoutFeature from '../infrastructure/store/layout.reducer';
import * as LayoutSelectors from '../infrastructure/store/layout.selectors';

@Injectable({
  providedIn: 'root',
})
export class LayoutFacade implements LayoutFacadeAbstract {
  sidebarOpened$ = this.store.select(LayoutSelectors.getSidebarOpened);
  theme$ = this.store.select(LayoutSelectors.getTheme);

  constructor(private store: Store<LayoutFeature.LayoutPartialState>) {}

  openSidebar() {
    this.store.dispatch(LayoutActions.openSidebar());
  }

  closeSidebar() {
    this.store.dispatch(LayoutActions.closeSidebar());
  }

  initTheme() {
    this.store.dispatch(LayoutActions.loadTheme());
  }

  setTheme(cssFile: string) {
    this.store.dispatch(LayoutActions.setTheme({ theme: cssFile }));
  }
}
