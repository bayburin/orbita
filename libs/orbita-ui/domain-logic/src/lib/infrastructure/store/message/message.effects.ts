import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { CommentApi } from './../../api/comment/comment.api';
import * as MessageFeature from './message.reducer';
import * as MessageActions from './message.actions';
import * as SdRequestActions from '../sd-request/sd-request.actions';
import * as SdRequestSelectors from '../sd-request/sd-request.selectors';
import { of } from 'rxjs';

@Injectable()
export class MessageEffects {
  constructor(
    private actions$: Actions,
    private store: Store<MessageFeature.MessagePartialState>,
    private commentApi: CommentApi
  ) {}

  createComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessageActions.createComment),
      switchMap((action) =>
        this.commentApi.create(action.ticketId, action.message).pipe(
          map(() => MessageActions.createCommentSuccess()),
          catchError((error) => of(MessageActions.createCommentFailure({ error })))
        )
      )
    )
  );

  receiveComment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MessageActions.receiveComment),
      withLatestFrom(this.store.select(SdRequestSelectors.getEntities)),
      map(([action, entities]) => {
        const sdRequestId = action.message.claim_id;
        const sdRequest = entities[sdRequestId];

        return sdRequest ? SdRequestActions.addComment({ id: sdRequestId, commentId: action.message.id }) : null;
      })
    )
  );
}
