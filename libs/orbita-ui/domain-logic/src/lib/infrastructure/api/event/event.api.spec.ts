import { EventTypeNames } from './../../../entities/models/event-type.interface';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ORBITA_UI_ENV_TOKEN, orbitaUiEnvironmentStub } from '@orbita/shared/environment';

import { EventApi } from './event.api';

describe('EventApi', () => {
  let service: EventApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EventApi,
        {
          provide: ORBITA_UI_ENV_TOKEN,
          useValue: orbitaUiEnvironmentStub,
        },
      ],
    });

    service = TestBed.inject(EventApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('create()', () => {
    const api = `${orbitaUiEnvironmentStub.serverApiUrl}/events`;
    const response = { message: 'ok' };

    it('should return requests', () => {
      service.create({ claim_id: 123, event_type: EventTypeNames.WORKFLOW }).subscribe((result) => {
        expect(result).toEqual(response);
      });

      httpMock
        .expectOne({
          method: 'POST',
          url: api,
        })
        .flush(response);
    });
  });
});
