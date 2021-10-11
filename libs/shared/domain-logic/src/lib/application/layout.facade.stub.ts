import { BehaviorSubject } from 'rxjs';

import { LayoutFacadeAbstract } from './layout.facade.abstract';

export class LayoutFacadeStub implements LayoutFacadeAbstract {
  sidebarOpened$ = new BehaviorSubject(false);
  theme$ = new BehaviorSubject('fake-theme');

  openSidebar() {
    /** */
  }

  closeSidebar() {
    /** */
  }

  initTheme() {
    /** */
  }

  setTheme(cssFile: string) {
    /** */
  }
}
