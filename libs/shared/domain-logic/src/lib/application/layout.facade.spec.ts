import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';
import { StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';

import { LayoutFacade } from './layout.facade';
import { LAYOUT_FEATURE_KEY, State, reducer, initialState } from '../infrastructure/store/layout.reducer';
import * as LayoutActions from '../infrastructure/store/layout.actions';

interface TestSchema {
  [LAYOUT_FEATURE_KEY]: State;
}

describe('LayoutFacade', () => {
  let facade: LayoutFacade;
  let store: MockStore<TestSchema>;

  describe('Unit', () => {
    const state = {
      [LAYOUT_FEATURE_KEY]: initialState,
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [LayoutFacade, provideMockStore({ initialState: state })],
      });

      store = TestBed.inject(MockStore);
      facade = TestBed.inject(LayoutFacade);
    });

    describe('initTheme()', () => {
      it('should call initTheme action', () => {
        spyOn(store, 'dispatch');
        facade.initTheme();

        expect(store.dispatch).toHaveBeenCalledWith(LayoutActions.loadTheme());
      });
    });

    describe('setTheme()', () => {
      it('should call setTheme action', () => {
        spyOn(store, 'dispatch');
        facade.setTheme('new-theme');

        expect(store.dispatch).toHaveBeenCalledWith(LayoutActions.setTheme({ theme: 'new-theme' }));
      });
    });
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [StoreModule.forFeature(LAYOUT_FEATURE_KEY, reducer)],
        providers: [LayoutFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [NxModule.forRoot(), StoreModule.forRoot({}), CustomFeatureModule],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      facade = TestBed.inject(LayoutFacade);
    });

    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let sidebarOpened = await readFirst(facade.sidebarOpened$);

        expect(sidebarOpened).toBe(true);

        facade.closeSidebar();

        sidebarOpened = await readFirst(facade.sidebarOpened$);

        expect(sidebarOpened).toBe(false);

        facade.openSidebar();

        sidebarOpened = await readFirst(facade.sidebarOpened$);

        expect(sidebarOpened).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
