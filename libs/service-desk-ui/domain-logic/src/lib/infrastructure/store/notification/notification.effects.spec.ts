import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as NotificationActions from './notification.actions';
import { NotificationEffects } from './notification.effects';
import { UserApi } from '../../api/user/user.api';
import { UserApiStub } from '../../api/user/user.api.stub';

describe('NotificationEffects', () => {
  let actions: Observable<Action>;
  let effects: NotificationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        NotificationEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: UserApi, useClass: UserApiStub },
      ],
    });

    effects = TestBed.inject(NotificationEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      // actions = hot('-a-|', { a: NotificationActions.init() });
      // const expected = hot('-a-|', { a: NotificationActions.loadNotificationSuccess({ notification: [] }) });
      // expect(effects.init$).toBeObservable(expected);
    });
  });
});
