// import { TestBed, async } from '@angular/core/testing';

// import { Observable } from 'rxjs';

// import { provideMockActions } from '@ngrx/effects/testing';
// import { provideMockStore } from '@ngrx/store/testing';

// import { NxModule, DataPersistence } from '@nrwl/angular';
// import { hot } from '@nrwl/angular/testing';

// import { GroupEffects } from './group.effects';
// import * as GroupActions from './group.actions';

// describe('GroupEffects', () => {
//   let actions: Observable<any>;
//   let effects: GroupEffects;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [NxModule.forRoot()],
//       providers: [
//         GroupEffects,
//         DataPersistence,
//         provideMockActions(() => actions),
//         provideMockStore(),
//       ],
//     });

//     effects = TestBed.inject(GroupEffects);
//   });

//   describe('init$', () => {
//     it('should work', () => {
//       actions = hot('-a-|', { a: GroupActions.init() });

//       const expected = hot('-a-|', {
//         a: GroupActions.loadGroupSuccess({ group: [] }),
//       });

//       expect(effects.init$).toBeObservable(expected);
//     });
//   });
// });

it('', () => {});
