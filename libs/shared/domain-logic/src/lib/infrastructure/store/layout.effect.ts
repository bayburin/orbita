import { Store } from '@ngrx/store';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { tap, withLatestFrom, map } from 'rxjs/operators';

import * as LayoutActions from './layout.actions';
import * as LayoutSelectors from './layout.selectors';
import * as fromLayout from './layout.reducer';

@Injectable()
export class LayoutEffects {
  constructor(
    private actions$: Actions,
    private store: Store<fromLayout.LayoutPartialState>,
    @Inject(DOCUMENT) private document: Document
  ) {}

  loadTheme$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LayoutActions.loadTheme),
        withLatestFrom(this.store.select(LayoutSelectors.getTheme)),
        map(([_action, cssFile]) => {
          const userThemeId = 'userTheme';
          const headEl = this.document.getElementsByTagName('head')[0];
          const existingEl = this.document.getElementById(userThemeId) as HTMLLinkElement;

          if (existingEl) {
            existingEl.href = cssFile;
          } else {
            const newCssEl = this.document.createElement('link');

            newCssEl.id = userThemeId;
            newCssEl.rel = 'stylesheet';
            newCssEl.href = cssFile;

            headEl.prepend(newCssEl);
          }
        })
      ),
    { dispatch: false }
  );

  setTheme$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(LayoutActions.setTheme),
        tap(() => this.store.dispatch(LayoutActions.loadTheme()))
      ),
    { dispatch: false }
  );
}
