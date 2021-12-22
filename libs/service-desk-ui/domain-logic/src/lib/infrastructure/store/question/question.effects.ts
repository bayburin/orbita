import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap } from 'rxjs/operators';

import { QuestionApi } from '../../api/question/question.api';
import * as QuestionActions from './question.actions';
import * as QuestionFeature from './question.reducer';

@Injectable()
export class QuestionEffects {
  constructor(private readonly actions$: Actions, private questionApi: QuestionApi) {}

  upRating$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(QuestionActions.upRating),
        switchMap((action) => this.questionApi.upRating(action.ticketId, action.serviceId))
      ),
    { dispatch: false }
  );
}
