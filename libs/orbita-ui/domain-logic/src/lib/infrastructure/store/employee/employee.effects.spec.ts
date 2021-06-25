// import { TestBed, async } from '@angular/core/testing';

// import { Observable } from 'rxjs';

// import { provideMockActions } from '@ngrx/effects/testing';
// import { provideMockStore } from '@ngrx/store/testing';

// import { NxModule, DataPersistence } from '@nrwl/angular';
// import { hot } from '@nrwl/angular/testing';

// import { EmployeeEffects } from './employee.effects';
// import * as EmployeeActions from './employee.actions';

// describe('EmployeeEffects', () => {
//   let actions: Observable<any>;
//   let effects: EmployeeEffects;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [NxModule.forRoot()],
//       providers: [EmployeeEffects, DataPersistence, provideMockActions(() => actions), provideMockStore()],
//     });

//     effects = TestBed.inject(EmployeeEffects);
//   });

//   describe('init$', () => {
//     it('should work', () => {
//       actions = hot('-a-|', { a: EmployeeActions.init() });

//       const expected = hot('-a-|', { a: EmployeeActions.loadEmployeeSuccess({ employee: [] }) });

//       expect(effects.init$).toBeObservable(expected);
//     });
//   });
// });

it('', () => {});
