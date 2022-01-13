import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';

import { ErrorHandlerService } from './error-handler.service';
import { NotificationFacade } from '../../application/notification/notification.facade';
import { NotificationFacadeStub } from './../../application/notification/notification.facade.stub';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;
  let notificationFacade: NotificationFacade;
  const msg = 'fake-message.';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: NotificationFacade, useClass: NotificationFacadeStub }],
    });

    service = TestBed.inject(ErrorHandlerService);
    notificationFacade = TestBed.inject(NotificationFacade);
    jest.spyOn(notificationFacade, 'showErrorMessage');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#handleError', () => {
    it('should notify user if received 403 status', () => {
      const error = new HttpErrorResponse({ status: 403 });

      service.handleError(error, msg);
      expect(notificationFacade.showErrorMessage).toHaveBeenCalledWith(`${msg} Доступ запрещен.`);
    });

    describe('when received 404 status', () => {
      describe('when error has Blob instance', () => {
        it('should notify user', () => {
          const error = new HttpErrorResponse({ error: new Blob(), status: 404 });

          service.handleError(error, msg);
          expect(notificationFacade.showErrorMessage).toHaveBeenCalledWith(`${msg} Файл не найден.`);
        });
      });

      it('should notify user', () => {
        const error = new HttpErrorResponse({ status: 404 });

        service.handleError(error, msg);
        expect(notificationFacade.showErrorMessage).toHaveBeenCalledWith(`${msg} Не найдено.`);
      });
    });

    describe('when received 422 status', () => {
      describe('when error has message attribute', () => {
        it('should notify user', () => {
          const errorMsg = 'test message';
          const error = new HttpErrorResponse({ error: { message: errorMsg }, status: 422 });

          service.handleError(error, msg);
          expect(notificationFacade.showErrorMessage).toHaveBeenCalledWith(`${msg} ${errorMsg}`);
        });
      });

      describe('when error has base attribute and does not have message attribute', () => {
        it('should notify user', () => {
          const errorMsg = 'test message';
          const error = new HttpErrorResponse({ error: { base: errorMsg }, status: 422 });

          service.handleError(error, msg);
          expect(notificationFacade.showErrorMessage).toHaveBeenCalledWith(`${msg} ${errorMsg}`);
        });
      });

      it('should notify user', () => {
        const error = new HttpErrorResponse({ error: {}, status: 422 });

        service.handleError(error, msg);
        expect(notificationFacade.showErrorMessage).toHaveBeenCalledWith(`${msg} Некорректные данные.`);
      });
    });

    it('should notify user if received 500 status', () => {
      const error = new HttpErrorResponse({ status: 500 });
      const errorMsg = `На сервере произошла ошибка. Мы автоматически получили уведомление о проблеме.
         Если со временем проблема не исчезнет, свяжитесь с нами по телефону 06.`;

      service.handleError(error, msg);
      expect(notificationFacade.showErrorMessage).toHaveBeenCalledWith(`${msg} ${errorMsg}`);
    });
  });
});
