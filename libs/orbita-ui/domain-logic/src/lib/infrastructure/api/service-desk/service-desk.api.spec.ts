import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ORBITA_UI_ENV_TOKEN, orbitaUiEnvironmentStub } from '@orbita/shared/environment';

import { ServiceDeskApi } from './service-desk.api';

describe('ServiceDeskApi', () => {
  let service: ServiceDeskApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ServiceDeskApi,
        {
          provide: ORBITA_UI_ENV_TOKEN,
          useValue: orbitaUiEnvironmentStub,
        },
      ],
    });

    service = TestBed.inject(ServiceDeskApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTickets()', () => {
    const api = `${orbitaUiEnvironmentStub.serviceDeskApi}/v2/tickets`;
    const sdTickets = [{ id: 1 }, { id: 2 }];

    it('should return free_sd_request_types', () => {
      service.getTickets().subscribe((result) => {
        expect(result).toEqual(sdTickets);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: api,
        })
        .flush(sdTickets);
    });
  });

  describe('getTicket()', () => {
    const api = `${orbitaUiEnvironmentStub.serviceDeskApi}/v2/tickets`;
    const id = 1;
    const sdTicket = { id: 1 };

    it('should return free_sd_request_types', () => {
      service.getTicket(id).subscribe((result) => {
        expect(result).toEqual(sdTicket);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: `${api}/identity/${id}`,
        })
        .flush(sdTicket);
    });
  });
});
