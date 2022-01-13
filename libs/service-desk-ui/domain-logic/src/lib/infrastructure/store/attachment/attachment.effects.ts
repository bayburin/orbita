import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, tap, mergeMap } from 'rxjs/operators';
import * as fileSaver from 'file-saver';

import { AttachmentApi } from './../../api/attachment/attachment.api';
import { ErrorHandlerService } from '../../services/error-handler.service';
import * as AttachmentActions from './attachment.actions';

@Injectable()
export class AttachmentEffects {
  constructor(
    private actions$: Actions,
    private attachmentApi: AttachmentApi,
    private errorHandlerService: ErrorHandlerService
  ) {}

  download$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AttachmentActions.download),
      mergeMap((action) =>
        this.attachmentApi.download(action.attachment.id, action.attachment.answer_id).pipe(
          tap((data) => fileSaver.saveAs(data, action.attachment.filename)),
          map(() => AttachmentActions.downloadSuccess({ id: action.attachment.id })),
          catchError((error) => {
            this.errorHandlerService.handleError(error, 'Не удалось скачать файл.');

            return of(AttachmentActions.downloadFailure({ id: action.attachment.id }));
          })
        )
      )
    )
  );
}
