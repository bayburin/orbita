import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';

import { EMPLOYEE_FEATURE_KEY, State, initialState } from '../../infrastructure/store/employee/employee.reducer';
import { TICKET_SYSTEM_FEATURE_KEY } from '../../infrastructure/store/index';
import { EmployeeFacade } from './employee.facade';
import { Employee } from './../../entities/models/employee/employee.interface';

interface TestSchema {
  [TICKET_SYSTEM_FEATURE_KEY]: {
    [EMPLOYEE_FEATURE_KEY]: State;
  };
}

describe('EmployeeFacade', () => {
  let facade: EmployeeFacade;
  let store: MockStore<TestSchema>;
  const createEmployeeEntity = (id: number, name = '') =>
    (({
      id,
      lastName: name || `name-${id}`,
    } as unknown) as Employee);

  describe('Unit', () => {
    let actions$: Observable<Action>;
    const state = {
      [TICKET_SYSTEM_FEATURE_KEY]: {
        [EMPLOYEE_FEATURE_KEY]: initialState,
      },
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [EmployeeFacade, provideMockActions(() => actions$), provideMockStore({ initialState: state })],
      });

      store = TestBed.inject(MockStore);
      facade = TestBed.inject(EmployeeFacade);
    });

    it('', () => {
      /**  */
    });
  });
});
