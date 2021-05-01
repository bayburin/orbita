import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ORBITA_UI_ENV_TOKEN } from '@orbita/shared/environment';

import { ServiceDeskApi } from './service-desk.api';

describe('ServiceDeskApi', () => {
  let service: ServiceDeskApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ServiceDeskApi,
        { provide: ORBITA_UI_ENV_TOKEN, useValue: { serviceDeskApi: 'http://test'  } }
      ]
    });

    service = TestBed.inject(ServiceDeskApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getFreeSdRequestTypes', () => {
    const api = 'http://test/v2/services';
    const sdRequests = [{ id: 1 }, { id: 2 }];

    it('should return free_sd_request_types', () => {
      service.getFreeSdRequestTypes().subscribe(result => {
        expect(result).toEqual(sdRequests);
      })

      httpMock.expectOne({
        method: 'GET',
        url: api
      }).flush(sdRequests);
    });
  });
});
