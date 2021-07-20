import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, tap, mergeMap } from 'rxjs/operators';
import * as fileSaver from 'file-saver';

import * as AttachmentActions from './attachment.actions';
import { AttachmentApi } from './../../api/attachment/attachment.api';

@Injectable()
export class AttachmentEffects {
  constructor(private actions$: Actions, private attachmentApi: AttachmentApi) {}

  download$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AttachmentActions.download),
      mergeMap((action) =>
        this.attachmentApi.download(action.attachment).pipe(
          tap((data) => fileSaver.saveAs(data, action.attachment.filename)),
          map(() => AttachmentActions.downloadSuccess({ id: action.attachment.id })),
          catchError(() => of(AttachmentActions.downloadFailure({ id: action.attachment.id })))
        )
      )
    )
  );
}
