import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as CategoryActions from './category.actions';
import { CategoryEffects } from './category.effects';
import { CategoryApi } from '../../api/category/category.api';
import { CategoryApiStub } from './../../api/category/category.api.stub';

describe('CategoryEffects', () => {
  let actions: Observable<Action>;
  let effects: CategoryEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CategoryEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: CategoryApi, useClass: CategoryApiStub },
      ],
    });

    effects = TestBed.inject(CategoryEffects);
  });

  describe('loadAll', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CategoryActions.loadAll() });

      const expected = hot('-a-|', { a: CategoryActions.loadAllSuccess({ categories: [] }) });

      expect(effects.loadAll$).toBeObservable(expected);
    });
  });
});
