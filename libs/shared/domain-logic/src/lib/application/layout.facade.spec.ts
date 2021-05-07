import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';
import { StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';

import { LayoutFacade } from './layout.facade';
import { LAYOUT_FEATURE_KEY, reducer } from '../infrastructure/store/layout.reducer';

describe('LayoutFacade', () => {
  let facade: LayoutFacade;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [StoreModule.forFeature(LAYOUT_FEATURE_KEY, reducer)],
        providers: [LayoutFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          CustomFeatureModule,
        ],
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
