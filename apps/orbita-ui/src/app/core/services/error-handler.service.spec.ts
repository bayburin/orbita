import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';

import { ErrorHandlerService } from './error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;
  let messageService: MessageService;
  const msgParams = {
    severity: 'error',
    summary: 'Ошибка',
    sticky: true,
    detail: '',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MessageService],
    });

    service = TestBed.inject(ErrorHandlerService);
    messageService = TestBed.inject(MessageService);
    jest.spyOn(messageService, 'add');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('handleError()', () => {
    it('should notify user if received 400 status', () => {
      const error = new HttpErrorResponse({ status: 400 });

      service.handleError(error);
      msgParams.detail = 'Некорректный запрос';
      expect(messageService.add).toHaveBeenCalledWith(msgParams);
    });

    it('should notify user if received 403 status', () => {
      const error = new HttpErrorResponse({ status: 403 });

      service.handleError(error);
      msgParams.detail = 'Доступ запрещен';
      expect(messageService.add).toHaveBeenCalledWith(msgParams);
    });

    describe('when received 404 status', () => {
      it('should notify user if error has Blob instance', () => {
        const error = new HttpErrorResponse({ error: new Blob(), status: 404 });

        service.handleError(error);
        msgParams.detail = 'Файл не найден';
        expect(messageService.add).toHaveBeenCalledWith(msgParams);
      });

      it('should notify user', () => {
        const error = new HttpErrorResponse({ status: 404 });

        service.handleError(error);
        msgParams.detail = 'Данные не найдены';
        expect(messageService.add).toHaveBeenCalledWith(msgParams);
      });
    });

    it('should notify user if received 500 status', () => {
      const error = new HttpErrorResponse({ status: 500 });
      msgParams.detail = 'Упс! На сервере произошла ошибка...';

      service.handleError(error);
      expect(messageService.add).toHaveBeenCalledWith(msgParams);
    });
  });
});
