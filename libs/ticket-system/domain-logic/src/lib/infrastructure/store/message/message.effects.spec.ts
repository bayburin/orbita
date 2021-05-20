// import { TestBed, async } from '@angular/core/testing';

// import { Observable } from 'rxjs';

// import { provideMockActions } from '@ngrx/effects/testing';
// import { provideMockStore } from '@ngrx/store/testing';

// import { NxModule, DataPersistence } from '@nrwl/angular';
// import { hot } from '@nrwl/angular/testing';

// import { MessageEffects } from './message.effects';
// import * as MessageActions from './message.actions';

// describe('MessageEffects', () => {
//   let actions: Observable<any>;
//   let effects: MessageEffects;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [NxModule.forRoot()],
//       providers: [
//         MessageEffects,
//         DataPersistence,
//         provideMockActions(() => actions),
//         provideMockStore(),
//       ],
//     });

//     effects = TestBed.inject(MessageEffects);
//   });

//   describe('init$', () => {
//     it('should work', () => {
//       actions = hot('-a-|', { a: MessageActions.init() });

//       const expected = hot('-a-|', {
//         a: MessageActions.loadMessageSuccess({ message: [] }),
//       });

//       expect(effects.init$).toBeObservable(expected);
//     });
//   });
// });

it('', () => {});
