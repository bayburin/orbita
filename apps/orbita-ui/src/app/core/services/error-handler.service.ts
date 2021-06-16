import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private messageService: MessageService) {}

  handleError(error: HttpErrorResponse) {
    let msg: string;

    switch (error.status) {
      case 400:
        msg = 'Некорректный запрос';

        break;
      case 403:
        msg = 'Доступ запрещен';

        break;
      case 404:
        msg = error.error instanceof Blob ? 'Файл не найден' : 'Данные не найдены';

        break;
      case 500:
        msg = 'Упс! На сервере произошла ошибка...';

        break;
    }

    this.messageService.add({
      severity: 'error',
      summary: 'Ошибка',
      sticky: true,
      detail: msg,
    });
  }
}
