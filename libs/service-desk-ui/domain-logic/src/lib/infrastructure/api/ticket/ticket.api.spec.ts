import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SERVICE_DESK_UI_ENV_TOKEN, serviceDeskUiEnvironmentStub } from '@orbita/shared/environment';

import { TicketApi } from './ticket.api';
import { Ticket } from '../../../entities/models/ticket.interface';

describe('TicketApi', () => {
  let question: TicketApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TicketApi,
        {
          provide: SERVICE_DESK_UI_ENV_TOKEN,
          useValue: serviceDeskUiEnvironmentStub,
        },
      ],
    });

    question = TestBed.inject(TicketApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(question).toBeTruthy();
  });

  describe('show()', () => {
    const api = `${serviceDeskUiEnvironmentStub.serverUrl}/tickets`;
    const ticket = { identity: 1 } as Ticket;

    it('should return question', () => {
      question.show(1).subscribe();

      httpMock
        .expectOne({
          method: 'GET',
          url: `${api}/1`,
        })
        .flush(ticket);
    });
  });
});
