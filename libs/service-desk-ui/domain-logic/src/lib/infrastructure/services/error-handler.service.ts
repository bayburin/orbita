import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { NotificationFacade } from './../../application/notification/notification.facade';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private notificationFacade: NotificationFacade) {}

  handleError(error: HttpErrorResponse, msg = '') {
    let defaultMsg: string;

    switch (error.status) {
      case 403:
        this.notificationFacade.showErrorMessage(`${msg} Доступ запрещен.`);

        break;
      case 404:
        defaultMsg = error.error instanceof Blob ? 'Файл не найден.' : 'Не найдено.';
        this.notificationFacade.showErrorMessage(`${msg} ${defaultMsg}`);

        break;
      case 400:
      case 422:
        defaultMsg = error.error.message || error.error.base || 'Некорректные данные.';
        this.notificationFacade.showErrorMessage(`${msg} ${defaultMsg}`);

        break;
      case 500:
        defaultMsg = `На сервере произошла ошибка. Мы автоматически получили уведомление о проблеме.
         Если со временем проблема не исчезнет, свяжитесь с нами по телефону 06.`;
        this.notificationFacade.showErrorMessage(`${msg} ${defaultMsg}`);

        break;
    }
  }
}
