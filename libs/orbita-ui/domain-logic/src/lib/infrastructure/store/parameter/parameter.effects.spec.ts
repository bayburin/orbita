// import { TestBed, async } from '@angular/core/testing';

// import { Observable } from 'rxjs';

// import { provideMockActions } from '@ngrx/effects/testing';
// import { provideMockStore } from '@ngrx/store/testing';

// import { NxModule, DataPersistence } from '@nrwl/angular';
// import { hot } from '@nrwl/angular/testing';

// import { ParameterEffects } from './parameter.effects';
// import * as ParameterActions from './parameter.actions';

// describe('ParameterEffects', () => {
//   let actions: Observable<any>;
//   let effects: ParameterEffects;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [NxModule.forRoot()],
//       providers: [
//         ParameterEffects,
//         DataPersistence,
//         provideMockActions(() => actions),
//         provideMockStore(),
//       ],
//     });

//     effects = TestBed.inject(ParameterEffects);
//   });

//   describe('init$', () => {
//     it('should work', () => {
//       actions = hot('-a-|', { a: ParameterActions.init() });

//       const expected = hot('-a-|', {
//         a: ParameterActions.loadParameterSuccess({ parameter: [] }),
//       });

//       expect(effects.init$).toBeObservable(expected);
//     });
//   });
// });

it('', () => {});
